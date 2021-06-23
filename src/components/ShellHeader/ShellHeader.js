import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  HeaderPanel,
  Switcher,
  SwitcherItem,
} from "carbon-components-react";
import {
  AppSwitcher20,
  Notification20,
  UserAvatar20,
  Search20,
} from "@carbon/icons-react";

import { logoutUser } from "../../reducers/authenticatedUserReducer";

/*
  Shell Header component

  Displays the outer UI shell of the application including menu bar/items and side bar/items to enable navigation

*/

const ShellHeader = ({ user }) => {
  const [panelToggle, setPanelToggle] = useState(false);
  const dispatch = useDispatch();

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Sankofa Healthcare">
          <SkipToContent />
          {user && (
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
          )}
          <HeaderName element={Link} to="/" prefix="IBM">
            Sankofa Healthcare
          </HeaderName>
          <HeaderNavigation aria-label="Sankofa Healthcare">
            {user && (
              <>
                <HeaderMenuItem element={Link} to="/my-healthcare">
                  My Healthcare [demo]
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/consultations">
                  Consultations [demo]
                </HeaderMenuItem>
                <HeaderMenu
                  aria-label="vaccinations"
                  menuLinkName="Vaccinations"
                >
                  <HeaderMenuItem element={Link} to="/confirmation">
                    View Vaccinations
                  </HeaderMenuItem>
                </HeaderMenu>
                <HeaderMenuItem element={Link} to="/pathology">
                  Pathology Results [demo]
                </HeaderMenuItem>{" "}
              </>
            )}
          </HeaderNavigation>
          {user && (
            <>
              {" "}
              <SideNav
                aria-label="Side navigation"
                expanded={isSideNavExpanded}
                isPersistent={false}
              >
                <SideNavItems>
                  <HeaderSideNavItems>
                    <HeaderMenuItem element={Link} to="/my-healthcare">
                      My Healthcare [demo]
                    </HeaderMenuItem>
                    <HeaderMenuItem element={Link} to="/consultations">
                      Consultations [demo]
                    </HeaderMenuItem>
                    <HeaderMenu
                      aria-label="vaccinations"
                      menuLinkName="Vaccinations"
                    >
                      <HeaderMenuItem element={Link} to="/confirmation">
                        View Vaccinations
                      </HeaderMenuItem>
                    </HeaderMenu>
                    <HeaderMenuItem element={Link} to="/pathology">
                      Pathology Results [demo]
                    </HeaderMenuItem>
                  </HeaderSideNavItems>
                </SideNavItems>
              </SideNav>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search">
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications">
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="User Avatar"
                  isActive={panelToggle}
                  onClick={() => setPanelToggle(!panelToggle)}
                >
                  <UserAvatar20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="App Switcher">
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
              <HeaderPanel aria-label="Header Panel" expanded={panelToggle}>
                <Switcher aria-label="Switcher Container">
                  <SwitcherItem
                    aria-label="logout"
                    element={Link}
                    to="/"
                    onClick={() => {
                      setPanelToggle(!panelToggle);
                      dispatch(logoutUser());
                    }}
                  >
                    Logout
                  </SwitcherItem>
                </Switcher>
              </HeaderPanel>
            </>
          )}
        </Header>
      )}
    />
  );
};

export default ShellHeader;
