import { apiClient } from "./client";

export const resumesApi = {
  // Get all resumes
  list: () =>
    apiClient.get("/resumes").then((r) => r.data),

  // Get one resume with all versions
  get: (id) =>
    apiClient.get(`/resumes/${id}`).then((r) => r.data),

  // Get one version
  getVersion: (id, versionId) =>
    apiClient
      .get(`/resumes/${id}/versions/${versionId}`)
      .then((r) => r.data),

  // Upload resume
  upload: (file, title) => {
    const fd = new FormData();
    fd.append("file", file);

    if (title) {
      fd.append("title", title);
    }

    return apiClient
      .post("/resumes", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((r) => r.data);
  },

  // Delete resume
  remove: (id) =>
    apiClient.delete(`/resumes/${id}`).then((r) => r.data),

  // Analyze resume
  analyze: (id, body = {}) =>
    apiClient
      .post(`/resumes/${id}/analyze`, body)
      .then((r) => r.data),

  // All analyses of a resume
  analyses: (id) =>
    apiClient
      .get(`/resumes/${id}/analyses`)
      .then((r) => r.data),

  // Analysis for a version
  analysisForVersion: (id, versionId) =>
    apiClient
      .get(`/resumes/${id}/versions/${versionId}/analysis`)
      .then((r) => r.data),

  // Rewrite
  rewrite: (id, body) =>
    apiClient
      .post(`/resumes/${id}/rewrite`, body)
      .then((r) => r.data),

  // Compare versions
  diff: (id, from, to, mode = "words") =>
    apiClient
      .get(`/resumes/${id}/diff`, {
        params: {
          from,
          to,
          mode,
        },
      })
      .then((r) => r.data),
};