const { seatService } = require("../services");
const { tryCatch, createError } = require("../utils");

const seatController = {};

seatController.updatePrice = tryCatch(async (req, res, next) => {
  const data = req.body;
  const { theaterId } = req.params;

  const existSeats = await seatService.findSeatsByTheaterSeatType(
    +theaterId,
    data.seatTypeId
  );
  if (!existSeats) {
    createError({ message: "Cannot find seats in DB", statusCode: 400 });
  }

  await seatService.updatePriceByTheaterSeatType(data.price, +theaterId, data.seatTypeId);
  res.status(200).json({
    message: `SeatTypeId :${data.seatTypeId} on theaterId : ${theaterId}, price is updated`,
  });
});

seatController.getSeatDetail = tryCatch(async (req, res, next) => {
  const { theaterId } = req.params;
  const { row, column } = req.query;

  const existSeat = await seatService.findSeatByTheaterRowCol(+theaterId, row, column);
  if (!existSeat) {
    createError({ message: "Cannot find seats in DB", statusCode: 400 });
  }

  res.status(200).json({
    seatDetail: existSeat,
  });
});

seatController.getSeatId = tryCatch(async (req, res, next) => {
  const { theaterId, row, column } = req.params;

  const existSeat = await seatService.findSeatByTheaterRowCol(+theaterId, row, column);
  if (!existSeat) {
    createError({ message: "Cannot find seats in DB", statusCode: 400 });
  }

  res.status(200).json({
    seatDetail: existSeat,
  });
});

module.exports = seatController;
