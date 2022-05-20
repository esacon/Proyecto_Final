import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";

export default async function ListFiles({ datalist }) {
  var list = await datalist;
  console.log(list);

  return list?.map((element) => (
    <tr key={element?.name}>
      <td className="name-td">
        <FontAwesomeIcon icon={solid("file")} className="icon-file" />
        <Link to="/probando" className="name_link">
          {element?.name}
        </Link>
      </td>
      <td>{element?.date}</td>
      <td>{element?.frame_rate}</td>
      <td>{element?.channels}</td>
    </tr>
  ));
}
