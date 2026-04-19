let worker: Worker;

function getWorker() {
  if (!worker) {
    worker = new Worker(
      new URL("../workers/storage.worker.ts", import.meta.url),
      { type: "module" }
    );
  }
  return worker;
}

export function sendMessage(type: string, payload?: any) {
  return new Promise((resolve, reject) => {
    const w = getWorker();

    const handler = (event: MessageEvent) => {
      const data = event.data;

      if (data.type === "error") reject(data.error);
      else resolve(data);

      w.removeEventListener("message", handler);
    };

    w.addEventListener("message", handler);
    w.postMessage({ type, payload });
  });
}