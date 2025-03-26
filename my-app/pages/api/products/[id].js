import  connectMongoDB from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const db = await  connectMongoDB();
  const productsCollection = db.collection('products');

  switch (method) {
    case 'PUT':
      // تحديث المنتج
      try {
        const { name, price, description } = req.body;
        const updatedProduct = await productsCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: { name, price, description } }
        );
        if (updatedProduct.modifiedCount === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
      }
      break;
    case 'DELETE':
      // حذف المنتج
      try {
        const deletedProduct = await productsCollection.deleteOne({
          _id: ObjectId(id),
        });
        if (deletedProduct.deletedCount === 0) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
