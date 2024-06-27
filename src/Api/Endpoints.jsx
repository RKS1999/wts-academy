export const baseURL = "https://wtsacademy.dedicateddevelopers.us/api";

export const image = (media) => {
  return (
    `https://wtsacademy.dedicateddevelopers.us` + `/uploads/product/${media}`
  );
};

export const profile_pic = (media) => {
  return (
    `https://wtsacademy.dedicateddevelopers.us` +
    `/uploads/user/profile_pic/${media}`
  );
};

export const endPoints = {
  users: {
    signup: "/user/signup",
    signin: "/user/signin",
  },
  product: {
    create: "/product/create",
    detail: "/product/detail",
    list: "/product/list",
    remove: "/product/remove",
    update: "/product/update",
  },
};
