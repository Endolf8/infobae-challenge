export const HTTP_STATUS = {
  ok: 200,
  created: 201,
  found: 302,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  conflict: 409,
  internalServerError: 500,
};

export const basePath = process.env.basePath ?? '';
