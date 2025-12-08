import type { Response } from "express";

type SuccessParams = {
  code?: number;
  data?: any;
  message?: string;
};

export const createSuccessResponse = (res: Response, params: SuccessParams) => {
  res.send({
    code: params.code || 200,
    data: params.data || {},
    message: params.message || "Success",
  });
};
