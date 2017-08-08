import Pagination from './src/pagination';
import PaginationSource from './src/pagination-source';

/* istanbul ignore next */
Pagination.install = function(Vue) {
  Vue.component(Pagination.name, Pagination);
};

PaginationSource.install = function(Vue) {
  Vue.component(PaginationSource.name, PaginationSource);
};

export default Pagination;
