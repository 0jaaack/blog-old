import React from "react";
import Link from "next/link";
import styled from "styled-components";

function NavButton({ page, isCurrentPage }) {
  return (
    <NavLink
      href="/"
      ishighligted={isCurrentPage}
    >
      {page}
    </NavLink>
  );
}

const NavLink = styled(Link)`
  border-bottom: ${({ ishighligted, theme }) => ishighligted ? `1px solid ${theme.color}` : "none"};
  font-size: 0.9rem;
  font-weight: 300;
  text-transform: capitalize;
`;

export default NavButton;
