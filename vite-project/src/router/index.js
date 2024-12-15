import { createRouter, createWebHistory } from "vue-router";
import AddProduct from "../components/AddProduct.vue";
import EditProduct from "../components/EditProduct.vue";
import Product from "../components/Product.vue";
import User from "../components/User.vue";
import ReactiveCrud from "../components/ReactiveCrud.vue";


const routes = [
  { path: "/", component: Product },
  { path: "/users", component: User },
  { path: "/reactive", component: ReactiveCrud },
  { path: "/add-product", component: AddProduct },
  { path: "/edit-product/:id", component: EditProduct, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
