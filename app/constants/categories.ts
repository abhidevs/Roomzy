import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: "Enjoy your vacation staying close to the beach!",
    },
    {
        label: "Windmills",
        icon: GiWindmill,
        description: "Experience nature staying close to the windmills!",
    },
    {
        label: "Modern",
        icon: MdOutlineVilla,
        description: "Spend you holidays in modern villas!",
    },
    {
        label: "Mountains",
        icon: TbMountain,
        description: "Explore jaw dropping views of mountains!",
    },
    {
        label: "Pools",
        icon: TbPool,
        description: "Enjoy your free time in pool attached properties!",
    },
    {
        label: "Islands",
        icon: GiIsland,
        description: "Spend time in a remote island!",
    },
    {
        label: "Lake",
        icon: GiBoatFishing,
        description: "Experience calmness of a lake!",
    },
    {
        label: "Skiing",
        icon: FaSkiing,
        description: "Participate in skiing activities!",
    },
    {
        label: "Castels",
        icon: GiCastle,
        description: "Spend your holiday in a castle!",
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: "Spend your time camping around nature!",
    },
    {
        label: "Arctic",
        icon: BsSnow,
        description: "Enjoy your vacation in snows!",
    },
    {
        label: "Cave",
        icon: GiCaveEntrance,
        description: "Spend your holiday exploring caves!",
    },
    {
        label: "Desert",
        icon: GiCactus,
        description: "Experience staying near a desert!",
    },
    {
        label: "Barns",
        icon: GiBarn,
        description: "Spend your vacation in a barn!",
    },
    {
        label: "Lux",
        icon: IoDiamond,
        description: "Enjoy your vacation with luxury!",
    },
];

export default categories;
