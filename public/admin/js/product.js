// change status
const butonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (butonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  butonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");
      if (!id) return;
      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      // console.log({ path, statusChange, id, action });
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// end change status

// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
const formDeleteItem = document.querySelector("#form-delete-item");
const path = formDeleteItem.getAttribute("data-path")

if (buttonsDelete.length > 0) {
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa không");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;

        console.log(action)
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}

// END Delete item
