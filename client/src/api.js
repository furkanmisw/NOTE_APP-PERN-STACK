async function api(path, method, body) {
  if (!method) method = "GET";
  const res = await fetch(window.location.origin + "/api" + path, {
    method,
    body: method === "GET" ? null : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) window.location.reload();
  const data = await res.json();
  const status = res.status;
  return { data, status };
}

export default api;
