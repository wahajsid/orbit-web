"use client";

/* ── A genuine product capture, or an honest gap ─────────────────────
   Renders the real screenshot when it exists (dimensions reserved,
   never cropped) and a labelled "pending" panel when it does not.

   Desktop screens are wider than the panel, so the image is a button
   that opens it full size in a native <dialog>: Escape closes it and
   focus returns to the button. A plain full-size link stays for
   visitors without JavaScript. The picture is evidence, not a control:
   nothing inside it is clickable. */

import { useRef } from "react";
import type { Moment } from "@/lib/home-moments";

export function Capture({ moment, priority = false, locale = "en", focus = false }: { moment: Moment; priority?: boolean; locale?: "en" | "ar"; focus?: boolean }) {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const t = locale === "ar"
    ? { inside: "داخل مساحة العمل الحقيقية", enlarge: (x: string) => `اعرض اللقطة كاملة: ${x}`, zoom: "اللقطة كاملة ⤢", open: "افتح اللقطة بالحجم الكامل", full: (x: string) => `اللقطة بالحجم الكامل: ${x}`, close: "إغلاق", scroll: "لقطة قابلة للتمرير" }
    : { inside: "Inside the real workspace", enlarge: (x: string) => `See the full capture: ${x}`, zoom: "Full capture ⤢", open: "Open the full-size capture", full: (x: string) => `Full-size capture: ${x}`, close: "Close", scroll: "Scrollable capture" };
  /* A focused crop of the claim is shown inline when one exists; the
     full capture stays one click away. */
  const thumb = focus && moment.focusSrc ? { src: moment.focusSrc, w: moment.focusWidth, h: moment.focusHeight } : { src: moment.src, w: moment.width, h: moment.height };

  if (!moment.ready) {
    return (
      <figure className="hw-capture hw-capture--pending">
        <div className="hw-capture-pending">
          <span className="hw-capture-icon" aria-hidden="true">▤</span>
          <strong>{t.inside}</strong>
          <span>{moment.pending}</span>
        </div>
      </figure>
    );
  }

  return (
    <>
      <figure className="hw-capture">
        <button type="button" className="hw-capture-open" onClick={() => dialog.current?.showModal()} aria-label={t.enlarge(moment.tabTitle)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb.src}
            alt={moment.alt}
            width={thumb.w}
            height={thumb.h}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority ? { fetchPriority: "high" as const } : {})}
          />
          <span className="hw-capture-zoom" aria-hidden="true">{t.zoom}</span>
        </button>
      </figure>
      <noscript>
        <a className="hw-capture-enlarge" href={moment.src}>{t.open}</a>
      </noscript>
      <dialog
        ref={dialog}
        className="hw-zoom"
        aria-label={t.full(moment.tabTitle)}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
      >
        <div className="hw-zoom-bar">
          <span>{moment.caption}</span>
          <button type="button" onClick={() => dialog.current?.close()}>{t.close} <span aria-hidden="true">✕</span></button>
        </div>
        <div className="hw-zoom-scroll" tabIndex={0} aria-label={t.scroll}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={moment.src} alt={moment.alt} width={moment.width} height={moment.height} loading="lazy" />
        </div>
      </dialog>
    </>
  );
}
