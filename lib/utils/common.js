exports.respond = function(res, data, type, code) {
  res.status(code || 200);

  return res.json({
    data: data,
    type: type
  });
}
