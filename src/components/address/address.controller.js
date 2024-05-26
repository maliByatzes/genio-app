
class AddressController {
  constructor(addressService) {
    this.addressService = addressService;
  }

  createAddress = async (req, res) => {
    try {
      const current_user = res.locals.user;

      const address = await this.addressService.addAddressTransaction(current_user, req.body);
      return res.status(201).send(address);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  getAddresses= async (req, res) => {
    try {
      const current_user = res.locals.user;

      const addresses = await this.addressService.getAddresses(current_user);
      return res.status(200).send(addresses);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

export default AddressController;
