
class AddressController {
  constructor(addressService, userAddressService, countryService) {
    this.addressService = addressService;
    this.userAddressService = userAddressService;
    this.countryService = countryService;
  }

  createAddress = async (req, res) => {
    try {

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}
