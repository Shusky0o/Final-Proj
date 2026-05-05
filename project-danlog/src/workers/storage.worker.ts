self.onmessage = async (event) => {
  const { type } = event.data;

  try {
    const root = await navigator.storage.getDirectory();
    const fileHandle = await root.getFileHandle("mostRecentOrder.txt", {
      create: true,
    });


    const file = await fileHandle.getFile();
    const text = await file.text();
    if (type === "getNextOrderId") {
      let current = parseInt(text);

      if (isNaN(current) || current <= 0) {
        return postMessage({ type: "result", data: null });
      }

      const next = current + 1;

      // write back
      // const writable = await fileHandle.createWritable();
      // await writable.write(next.toString());
      // await writable.close();

      postMessage({ type: "result", data: next });
    }

    if (type === "setNextOrderId") {
      let current = parseInt(text);

      const writable = await fileHandle.createWritable();
      await writable.write((current + 1).toString());
      await writable.close();
    }

    // -------------------------
    // RESET (optional)
    // -------------------------
    if (type === "reset") {
      const writable = await fileHandle.createWritable();
      await writable.write("0");
      await writable.close();

      postMessage({ type: "ok" });
    }

  } catch (err: any) {
    postMessage({ type: "error", error: err.message });
  }
};