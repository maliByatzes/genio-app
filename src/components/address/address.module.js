import AuthMiddleware from "../auth/auth.middleware.js";
import AuthService from "../auth/auth.service.js";
import CountryService from "../country/country.service.js";
import UserService from "../user/user.service.js";
import UserAddressService from "../user_address/user_address.service.js";
import AddressController from "./address.controller.js";
import AddressRouter from "./address.router.js";
import AddressService from "./address.service.js";

const countryService = new CountryService();
const userAddressService = new UserAddressService();
const addressService = new AddressService(countryService, userAddressService);
const addressController = new AddressController(addressService);
const userService = new UserService();
const authService = new AuthService();
const authMiddleware = new AuthMiddleware(authService, userService);
const addressRouter = new AddressRouter(addressController, authMiddleware);

export default {
  router: addressRouter.router,
};
