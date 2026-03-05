import { z } from 'zod';

const schemaValidatorMiddleware =
  (schema, source = 'body') =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]); // gets req.body o req.query from the route where it's called. Default to body.

    if (!result.success) {
      return res.status(400).json({
        error: 'Data validation error',
        detalles: z.prettifyError(result.error),
      });
    }

    req.body = result.data;
    next();
  };

export default schemaValidatorMiddleware;
