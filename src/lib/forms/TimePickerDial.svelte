<script lang="ts">
  import Button from "$lib/buttons/Button.svelte";
  import { Spring } from "svelte/motion";

  let {
    time = "",
    clearable = false,
    close,
    setTime,
  }: {
    time?: string;
    clearable?: boolean;
    close: () => void;
    setTime: (time: string) => void;
  } = $props();

  // 24-hour "HH:MM" → integers. Empty string parses to 00:00.
  const parseTime = (s: string): { h: number; m: number } => {
    if (!s) return { h: 0, m: 0 };
    const [hs, ms] = s.split(":");
    return {
      h: Math.max(0, Math.min(23, parseInt(hs) || 0)),
      m: Math.max(0, Math.min(59, parseInt(ms) || 0)),
    };
  };
  const fmt = (h: number, m: number) =>
    `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

  const initial = parseTime(time);
  let editH = $state(initial.h); // 0..23
  let editM = $state(initial.m); // 0..59
  let mode = $state<"hour" | "minute">("hour");

  let isPm = $derived(editH >= 12);
  let h12 = $derived(editH % 12 || 12);
  // --- Dial geometry ---
  const DIAL = 256;
  const CENTER = DIAL / 2;
  const RADIUS = 100;
  const NUM = 40;

  // Continuous angle the arm + masked-glyph layer rotate to. In hour mode the
  // value snaps to 30° per hour; in minute mode it's 6° per minute so the user
  // can scrub through any value 0..59 by dragging between labelled positions.
  // The spring drives the actual rendered angle so this stays snappy without
  // relying on CSS interpolation of custom properties.
  const visualAngle = new Spring((initial.h % 12) * 30 - 90, {
    stiffness: 0.3,
    damping: 1,
  });
  $effect(() => {
    let next = mode == "hour" ? (editH % 12) * 30 - 90 : editM * 6 - 90;
    next -= Math.round((next - visualAngle.target) / 360) * 360;
    if (instantJump) void visualAngle.set(next, { instant: true });
    else visualAngle.target = next;
  });

  const slotPos = (i: number) => {
    const rad = ((i * 30 - 90) * Math.PI) / 180;
    return { x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) };
  };
  const slotLabel = (i: number) =>
    mode == "hour" ? (i || 12).toString() : (i * 5).toString().padStart(2, "0");

  // Unique mask id so multiple instances on a page don't collide.
  const maskId = $props.id();

  const applyHourSlot = (slot: number) => {
    editH = (slot % 12) + (isPm ? 12 : 0);
  };
  const applyMinuteValue = (m: number) => {
    editM = m % 60;
  };

  // Tapping an hour label advances to minute mode.
  const pickHour = (slot: number) => {
    applyHourSlot(slot);
    mode = "minute";
  };
  // Tapping a minute label confirms.
  const pickMinute = (m: number) => {
    applyMinuteValue(m);
    confirm();
  };
  const setAmPm = (toPm: boolean) => {
    if (toPm == isPm) return;
    editH = toPm ? editH + 12 : editH - 12;
  };
  const confirm = () => {
    setTime(fmt(editH, editM));
    close();
  };
  const cancel = () => close();
  const clear = () => {
    setTime("");
    close();
  };

  // Pointer interaction. The initial tap snaps the needle immediately; once
  // movement crosses a small threshold the rest of the gesture is treated as a
  // drag and the spring follows the cursor instead of teleporting every event.
  let dragging = false;
  let movedPastThreshold = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let instantJump = $state(false);
  const DRAG_THRESHOLD = 4; // px

  const updateFromPointer = (e: PointerEvent) => {
    const dial = e.currentTarget as HTMLElement;
    const r = dial.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2;
    const dy = e.clientY - r.top - r.height / 2;
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI; // -180..180, 0 = right
    const norm = (((ang + 90) % 360) + 360) % 360; // 0..360, 0 = top
    if (mode == "hour") applyHourSlot(Math.round(norm / 30));
    else applyMinuteValue(Math.round(norm / 6));
  };
  const onDialPointerDown = (e: PointerEvent) => {
    if (e.button != 0) return;
    dragging = true;
    movedPastThreshold = false;
    instantJump = true;
    pointerStartX = e.clientX;
    pointerStartY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromPointer(e);
  };
  const onDialPointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    if (!movedPastThreshold) {
      const dx = e.clientX - pointerStartX;
      const dy = e.clientY - pointerStartY;
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      movedPastThreshold = true;
      instantJump = false;
    }
    updateFromPointer(e);
  };
  const onDialPointerUp = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    instantJump = false;
    if (mode == "hour") mode = "minute";
    else confirm();
  };
</script>

<div class="m3-container">
  <p class="title">Select time</p>

  <div class="display">
    <button
      type="button"
      class="seg"
      class:on={mode == "hour"}
      onclick={() => (mode = "hour")}
      aria-label="Select hour"
    >
      {h12.toString().padStart(2, "0")}
    </button>
    <span class="colon">:</span>
    <button
      type="button"
      class="seg"
      class:on={mode == "minute"}
      onclick={() => (mode = "minute")}
      aria-label="Select minute"
    >
      {editM.toString().padStart(2, "0")}
    </button>
    <div class="ampm">
      <button type="button" class:on={!isPm} onclick={() => setAmPm(false)}>AM</button>
      <button type="button" class:on={isPm} onclick={() => setAmPm(true)}>PM</button>
    </div>
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <svg
    class="dial"
    width={DIAL}
    height={DIAL}
    viewBox="0 0 {DIAL} {DIAL}"
    onpointerdown={onDialPointerDown}
    onpointermove={onDialPointerMove}
    onpointerup={onDialPointerUp}
    onpointercancel={onDialPointerUp}
  >
    <!-- Dial face -->
    <circle cx={CENTER} cy={CENTER} r={CENTER} fill="var(--m3c-surface-container-highest)" />

    <!-- The mask cuts a circular window over the rotating disc, so the colour-
         inverted text layer only shows through where the disc currently sits.
         Both this circle and the visible arm share the same spring rotation. -->
    <defs>
      <mask id={maskId}>
        <rect width={DIAL} height={DIAL} fill="black" />
        <circle
          cx={CENTER + RADIUS}
          cy={CENTER}
          r={NUM / 2}
          fill="white"
          class="rot"
          style="transform: rotate({visualAngle.current}deg)"
        />
      </mask>
    </defs>

    <!-- Centre dot -->
    <circle cx={CENTER} cy={CENTER} r="4" fill="var(--m3c-primary)" />

    <!-- Default numbers (base layer, always rendered). -->
    {#each Array(12) as _, i (i)}
      {@const p = slotPos(i)}
      <text x={p.x} y={p.y} class="num default" text-anchor="middle" dominant-baseline="central">
        {slotLabel(i)}
      </text>
    {/each}

    <!-- The arm: line + disc, rotating around the dial centre. -->
    <g class="rot" style="transform: rotate({visualAngle.current}deg)" pointer-events="none">
      <line x1={CENTER} y1={CENTER} x2={CENTER + RADIUS} y2={CENTER} class="hand" />
      <circle cx={CENTER + RADIUS} cy={CENTER} r={NUM / 2} class="disc" />
    </g>

    <!-- Inverted-glyph layer: same numbers in on-primary, but only visible
         through the rotating mask hole — so as the disc passes a number, that
         portion of the glyph smoothly flips colour. -->
    <g mask="url(#{maskId})" pointer-events="none">
      {#each Array(12) as _, i (i)}
        {@const p = slotPos(i)}
        <text x={p.x} y={p.y} class="num inverted" text-anchor="middle" dominant-baseline="central">
          {slotLabel(i)}
        </text>
      {/each}
    </g>
  </svg>

  <div class="actions">
    {#if clearable}
      <span class="left">
        <Button variant="text" onclick={clear} type="button">Clear</Button>
      </span>
    {/if}
    <Button variant="text" onclick={cancel} type="button">Cancel</Button>
    <Button variant="text" onclick={confirm} type="button">OK</Button>
  </div>
</div>

<style>
  @layer tokens {
    :root {
      --m3-time-picker-shape: var(--m3-shape-extra-large);
    }
  }

  .m3-container {
    display: flex;
    flex-direction: column;
    width: 20.5rem;
    padding: 1.5rem 1.5rem 0.25rem;
    gap: 1.25rem;
    background-color: var(--m3c-surface-container-high);
    color: var(--m3c-on-surface);
    border-radius: var(--m3-time-picker-shape);
  }

  .title {
    @apply --m3-label-medium;
    margin: 0;
    color: var(--m3c-on-surface-variant);
  }

  /* HH:MM display + AM/PM toggle ----------------------------------------- */
  .display {
    display: flex;
    align-items: stretch;
    gap: 0.5rem;
    justify-content: center;
  }
  .seg {
    @apply --m3-display-medium;
    flex: none;
    min-width: 5.5rem;
    padding: 0.875rem 0.5rem;
    text-align: center;
    border: none;
    border-radius: 0.5rem;
    background-color: var(--m3c-surface-container-highest);
    color: var(--m3c-on-surface);
    cursor: pointer;
    transition:
      background-color 140ms,
      color 140ms;
  }
  /* Selected segment is the filled-tonal inversion: bright primary fill with
     on-primary text (the same tonal pair Android M3 uses for the active
     segment, so it reads as dark glyphs on a light fill). */
  .seg.on {
    background-color: var(--m3c-primary);
    color: var(--m3c-on-primary);
  }
  .colon {
    @apply --m3-display-medium;
    display: flex;
    align-items: center;
    /* The ':' glyph sits low in its line-box — nudge it up so it visually
       centres between the two digit segments. */
    transform: translateY(-0.375rem);
  }
  /* AM/PM toggle: two pill buttons stacked vertically, not bordered as a
     single container. `flex: none` so the parent flex row can't crush them. */
  .ampm {
    flex: none;
    width: 3.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-left: 0.5rem;
  }
  .ampm button {
    @apply --m3-label-large;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    /* Inactive = squarish outlined pill. */
    border-radius: 0.5rem;
    cursor: pointer;
    color: var(--m3c-on-surface-variant);
    background-color: transparent;
    box-shadow: inset 0 0 0 1px var(--m3c-outline);
    transition:
      background-color 140ms,
      color 140ms,
      box-shadow 140ms,
      border-radius 140ms;
  }
  /* Active = tonal pink fill, fully rounded — the M3 "shape morph" between
     the rectangular inactive state and the pill active state. */
  .ampm button.on {
    background-color: var(--m3c-tertiary-container);
    color: var(--m3c-on-tertiary-container);
    box-shadow: none;
    border-radius: var(--m3-shape-full);
  }

  /* Dial ----------------------------------------------------------------- */
  .dial {
    display: block;
    margin: 0.5rem auto 0;
    touch-action: none;
    user-select: none;
    cursor: pointer;
  }
  /* The arm + the mask disc share this rule, so they orbit in lock-step
     around the dial centre via the same spring-driven angle. */
  .rot {
    transform-origin: 50% 50%;
  }
  .hand {
    stroke: var(--m3c-primary);
    stroke-width: 2;
    stroke-linecap: round;
  }
  .disc {
    fill: var(--m3c-primary);
  }
  .num {
    @apply --m3-body-large;
    font-family: inherit;
  }
  .num.default {
    fill: var(--m3c-on-surface);
  }
  .num.inverted {
    fill: var(--m3c-on-primary);
    pointer-events: none;
  }

  /* Actions -------------------------------------------------------------- */
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }
  .actions > .left {
    margin-right: auto;
  }
</style>
