import AppAPI from '../network/AppApi';

const route = '/brands';
const FEATURED_PAGE_SIZE = 50;

class BrandsService {
  static getFeaturedBrands = () => AppAPI.get(`${route}?brand[featured]=true&page[size]=${FEATURED_PAGE_SIZE}`);
}

export default BrandsService;
