// import dbConnect from '../../lib/mongodb';

// export default async function handler(req, res) {
//   const { method } = req;
//   const db = await dbConnect();
//   const productsCollection = db.collection('products');

//   switch (method) {
//     case 'POST':
//       // إضافة منتج جديد
//       try {
//         const { name, price, description } = req.body;
//         const newProduct = await productsCollection.insertOne({
//           name,
//           price,
//           description,
//         });
//         res.status(201).json(newProduct.ops[0]);
//       } catch (error) {
//         res.status(500).json({ message: 'Error creating product' });
//       }
//       break;
//     case 'GET':
//       // جلب المنتجات
//       try {
//         const products = await productsCollection.find({}).toArray();
//         res.status(200).json(products);
//       } catch (error) {
//         res.status(500).json({ message: 'Error fetching products' });
//       }
//       break;
//     default:
//       res.status(405).json({ message: 'Method Not Allowed' });
//       break;
//   }
// }
import  connectMongoDB from '../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const db = await  connectMongoDB();
  const productsCollection = db.collection('products');

  switch (method) {
    case 'POST':
      // إضافة منتج جديد
      try {
        const { name, price, description } = req.body;
        // التحقق من البيانات المدخلة
        if (!name || !price || !description) {
          return res.status(400).json({ message: 'Name, price, and description are required' });
        }
        
        const newProduct = await productsCollection.insertOne({
          name,
          price,
          description,
          createdAt: new Date(),
        });

        res.status(201).json(newProduct.ops[0]);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
      }
      break;

    case 'GET':
      // جلب جميع المنتجات
      try {
        const products = await productsCollection.find({}).toArray();
        res.status(200).json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
