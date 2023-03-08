import { Request, Response, NextFunction } from "express";

const sendErrorResponse = (
  res: Response,
  errors: { message: string; errorType: string }[],
  statusCode = 500
) => {
  res.setHeader("Content-Type", "application/json");
  res.status(statusCode).json({ status: "error", errors });
};

function sendSuccessResponse<T>(res: Response, data: T) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ status: "success", data });
}
