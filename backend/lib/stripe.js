import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe("sk_test_51Oo4OlHQoq0yTb3jZNTYsKLazjyctaOafOIBk7kmYPonn67GVEeNyHJQ2CITpBj2E108UQkUgzw5P1g3TlBwRRDt00HCYvIh9t");
