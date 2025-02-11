const sendSuccessResponse = (res, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendErrorResponse = (res, message, error = {}, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

const pageDataSuccessResponse = (res, message, data = {}, page, limit, total, statusCode = 200) => {
  const totalPages = Math.ceil(total / limit);
  const websiteUrl = process.env.WEBSITE_URL;

  res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      next: page < totalPages ? `${websiteUrl}/api/v1/jobadverts?page=${page + 1}&limit=${limit}` : null,
      prev: page > 1 ? `${websiteUrl}/api/v1/jobadverts?page=${page - 1}&limit=${limit}` : null,
    },
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse,pageDataSuccessResponse };
