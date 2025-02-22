export const sqlQueries = {
  getAllShirts: "SELECT * FROM shirts",
  getShirtsByColors: "SELECT * FROM shirts WHERE color && $1",
  getShirtsByMaterial: "SELECT * FROM shirts WHERE material = $1",
}
