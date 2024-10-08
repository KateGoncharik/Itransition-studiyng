fetch("http://localhost:3000/users/49", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Successfully deleted user:", data);
  })
  .catch((error) => {
    console.error("Error while user deletion:", error);
  });
