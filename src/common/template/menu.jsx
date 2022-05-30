import React from "react";

import MenuItem from "./menuItem";
import MenuThree from "./menuThree";

export default props => (
    <ul className="sidebar-menu">
        <MenuItem path="/" label="Dashboard" icon="dashboard" />
        <MenuThree label="Cadastro" icon="edit">
            <MenuItem path="billingCycles" label="Ciclos de pagamentos" icon="usd" />
        </MenuThree>
    </ul>
)