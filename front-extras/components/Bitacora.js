"use client";

export default function Bitacora({ log }) {
  return (
    <div className="mb-5 p-3">
      <input
        type="text"
        className="bitacora-title form-control bg-transparent border-0 fs-1 fw-bold"
        value={log.title || ""}
        disabled
      />

      <hr />
      <div className="d-flex justify-content-end">
        <input
          type="text"
          className="d-inline border-none bg-transparent border-0 mx-3"
          value={log.date || ""}
          disabled
        />
      </div>

      <textarea
        value={log.content || ""}
        className="vh-50 my-3 rounded-2 p-4 w-100 bg-body-tertiary border-0 rounded-4"
        disabled
      />
    </div>
  );
}
