import { Request, Response } from "express";
import { contacts } from "../models/contacts";
import models from "../models/database";


//const saltRounds = 10;

// export const getContacts = async (req: Request, res: Response) => {
//   const userID = req?.user?.userID;
//   console.log(req?.user?.userID)
//   const data = await models.usercontact_junction.findAll({
//     attributes: [],
//     where: {
//       userID: userID,
//     },
//     include: [
//       {
//         model: contacts,
//         as: "contact",
//         // attributes: ["sellerName"],
//       },
//     ],
//   });
//   // console.log("get contacts called")
//   return res.json({
//     data,
//   });
// };

export const getContacts = async (req: Request, res: Response) => {
  // const userID = req?.user?.userID;
  // console.log(req?.user?.userID)
  const data = await models.usercontact_junction.findAll({
    attributes: [],
    // where: {
    //   userID: userID,
    // },
    include: [
      {
        model: contacts,
        as: "contact",
        // attributes: ["sellerName"],
      },
    ],
  });
  // console.log("get contacts called")
  return res.json({
    data,
  });
};

export const CreateContact = async (req: Request, res: Response) => {
  const contactData = req.body;
  const createdContact = models.contacts.create({
    contactNumber: contactData.contactNumber,
    contactFirstName: contactData.contactFirstName,
    contactLastName: contactData.contactLastName,
  });
  console.log(createdContact)
  return res.json({
    createdContact,
  });
};

export const updateContact = async (req: Request, res: Response) => {
  const contactData = req.body;
  const createdContact = await models.contacts.update(
    {
      contactFirstName: contactData.contactFirstName,
      contactLastName: contactData.contactLastName,
      contactNumber: contactData.contactNumber,
     
    },{
      where:{
        contactID:contactData.contactID
      }
    }
  );
  res.json({
    createdContact
  })
};

export const deleteContact = async (req: Request) => {
  const contactToBeDeleted =  req.body;
  await models.contacts.destroy({
    where:{
      contactID: contactToBeDeleted.contactData
    }
  }) 
};
