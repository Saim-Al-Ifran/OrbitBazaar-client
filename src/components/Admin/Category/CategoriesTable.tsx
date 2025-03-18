import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
 

const TABLE_HEAD = ["Category-image", "Category-name", "Actions"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    category_name: "Manager",
 
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    category_name: "Programmer",
 
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    category_name: "Executive",
 
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    category_name: "Programmer",
 
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    category_name: "Manager",

  },
];

const CategoriesTable = () => {
 
 
  return (
    <>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  {...(undefined as any)}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((user, index) => {
            const { img, category_name } = user;
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={category_name}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={img} alt={category_name} size="lg" {...(undefined as any)} />
 
                  </div>
                </td>
                <td className={classes}>
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      {...(undefined as any)}
                    >
                      {category_name}
                    </Typography>
 
                  </div>
                </td>
 
                <td className={classes}>
                    <div className="flex items-center gap-4">
                      <NavLink to="/dashboard/category/edit/1">
                        <Tooltip content="Edit User" >  
                          <IconButton variant="filled"   {...(undefined as any)}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </NavLink>

                      <Tooltip content="Delete User">
                          <IconButton
                            variant="filled"
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                            {...(undefined as any)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
 
    </>
  );
};

export default CategoriesTable;
