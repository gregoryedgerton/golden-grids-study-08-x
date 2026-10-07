import type { ReactNode } from "react";
import { Fact as FactBox } from "./boxes";
import { ExpandedCell, type ExpandGroup } from "./expand";
import type { Fact, Photo } from "../content";

/**
 * What goes inside a square. Only a direct GoldenBox counts as a GoldenGrid
 * child, so these return the INSIDE of the box and the band wraps each in
 * `<GoldenBox {...x.boxProps(key)}>`.
 *
 *   PhotoCard — a photograph filling the square, a caption at its foot, and
 *               the picture as the control that expands it: the whole image
 *               at its own proportion, the alt text and the attribution the
 *               licence requires.
 *   FactCard  — a label, a fitted line, body copy in two lengths, and a
 *               More control where there is a longer passage.
 *   WordCard  — type as a design element in a square no story needs: a
 *               word from the subject, set as large as the square allows.
 */
export function PhotoCard({ photo, caption, x, slotKey, kicker, children }: {
  photo: Photo; caption?: string; x: ExpandGroup; slotKey: string; kicker?: string; children?: ReactNode;
}) {
  return (
    <>
      <figure className="media">
        <img src={photo.src} alt={photo.alt} loading="lazy" style={photo.position ? { objectPosition: photo.position } : undefined} />
        <button className="media__open" {...x.triggerProps(slotKey)}><span className="visually-hidden">Open: {caption ?? photo.alt}</span></button>
        {(caption || kicker) && (
          <figcaption className="media__caption">
            {kicker && <span className="media__kicker">{kicker}</span>}
            {caption}
          </figcaption>
        )}
        {children}
      </figure>
      {x.isOpen(slotKey) && (
        <ExpandedCell id={x.panelId(slotKey)} title={caption ?? photo.alt} onClose={x.close} closeRef={x.closeRef}>
          <figure className="photo-view">
            <img src={photo.src} alt={photo.alt} style={{ aspectRatio: "auto" }} />
            <figcaption>
              <p>{photo.alt}.</p>
              <p className="photo-view__credit">Photograph: {photo.credit}, <a href={photo.page}>Wikimedia Commons</a>, {photo.licence}.</p>
            </figcaption>
          </figure>
        </ExpandedCell>
      )}
    </>
  );
}

export function FactCard({ fact, x, slotKey, tone }: { fact: Fact; x?: ExpandGroup; slotKey?: string; tone?: string }) {
  const body = fact.body ? (
    <>
      <p className="box__body--short">{fact.body}</p>
      <p className="box__body--long">{fact.body}{fact.long ? ` ${fact.long}` : ""}</p>
    </>
  ) : undefined;
  return (
    <FactBox
      label={fact.label}
      fitClass={fact.fitClass}
      max={120}
      body={body}
      source={fact.source}
      tone={tone}
      expand={fact.long && x && slotKey ? {
        group: x, slotKey, title: fact.label,
        full: <div className="cell__body"><p className="cell__line">{fact.line}</p><p>{fact.body} {fact.long}</p></div>,
      } : undefined}
    >
      {fact.line}
    </FactBox>
  );
}

export function WordCard({ word, label, tone = "ink" }: { word: string; label?: string; tone?: string }) {
  return <FactBox label={label} fitClass="fit--word" max={120} tone={tone}>{word}</FactBox>;
}
