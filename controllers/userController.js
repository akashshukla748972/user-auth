export const handleCreateUser = async (req, res) => {
  try {
    const { name, email, phone, gender, password } = req.body;
    console.log(name, email, phone, gender, password);
    return res.status(201).json({
      message: "Success",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: true,
    });
  }
};

export const handleGetUser = async (req, res) => {
  res.status(200).json({
    message: "successfully requested",
  });
};
