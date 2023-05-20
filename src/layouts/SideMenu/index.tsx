import { useAuth } from "@/providers/AuthProvider";
import clsx from "clsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Transition } from "react-transition-group";
import logoUrl from "@/assets/images/logo.png";
import Lucide from "@/base-components/Lucide";
import MobileMenu from "@/components/MobileMenu";
import CustomNotification from "@/components/Notification";
import SideMenuTooltip from "@/components/SideMenuTooltip";
import { selectSideMenu } from "@/stores/apps/sideMenuSlice";
import { useAppSelector } from "@/stores/hooks";
import { FormattedMenu, enter, leave, linkTo, nestedMenu } from "./side-menu";

function Main() {
  const {logout} = useAuth()
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState<
    Array<FormattedMenu | "divider">
  >([]);
  const sideMenuStore = useAppSelector(selectSideMenu);
  const sideMenu = () => nestedMenu(sideMenuStore, location);

  useEffect(() => {
    setFormattedMenu(sideMenu());
  }, [sideMenuStore, location.pathname]);

  return (
    <div className="py-2">
      {/* <DarkModeSwitcher /> */}
      {/* <MainColorSwitcher /> */}
      <MobileMenu />
      <div className="flex mt-[4.7rem] md:mt-0">
        {/* BEGIN: Side Menu */}
        <nav className="pr-5 pb-16 overflow-x-hidden hidden md:block w-[85px] xl:w-[230px]">
          <Link
            to="/side-menu/dashboard-overview-1"
            className="flex flex-col gap-4 justify-center items-center pt-4"
          >
            <img
              alt="Logo Nobel"
              className="w-24"
              src={logoUrl}
            />
            <span className="hidden ml-3 text-lg text-white xl:block">
              Pemprov Maluku Utara
            </span>
          </Link>
          <Divider type="div" className="my-6"></Divider>
          <ul>
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              menu == "divider" ? (
                <Divider
                  type="li"
                  className={clsx([
                    "my-6",

                    // Animation
                    `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${
                      (menuKey + 1) * 10
                    }`,
                  ])}
                  key={menuKey}
                ></Divider>
              ) : (
                <li key={menuKey}>
                  <Menu
                    className={clsx({
                      // Animation
                      [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                        (menuKey + 1) * 10
                      }`]: !menu.active,
                    })}
                    menu={menu}
                    formattedMenuState={[formattedMenu, setFormattedMenu]}
                    level="first"
                  ></Menu>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={clsx([
                          "bg-black/10 rounded-lg dark:bg-darkmode-900/30",
                          { block: menu.activeDropdown },
                          { hidden: !menu.activeDropdown },
                        ])}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <Menu
                              className={clsx({
                                // Animation
                                [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                  (subMenuKey + 1) * 10
                                }`]: !subMenu.active,
                              })}
                              menu={subMenu}
                              formattedMenuState={[
                                formattedMenu,
                                setFormattedMenu,
                              ]}
                              level="second"
                            ></Menu>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={clsx([
                                    "bg-black/10 rounded-lg dark:bg-darkmode-900/30",
                                    {
                                      block: subMenu.activeDropdown,
                                    },
                                    { hidden: !subMenu.activeDropdown },
                                  ])}
                                >
                                  {subMenu.subMenu.map(
                                    (lastSubMenu, lastSubMenuKey) => (
                                      <li key={lastSubMenuKey}>
                                        <Menu
                                          className={clsx({
                                            // Animation
                                            [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${
                                              (lastSubMenuKey + 1) * 10
                                            }`]: !lastSubMenu.active,
                                          })}
                                          menu={lastSubMenu}
                                          formattedMenuState={[
                                            formattedMenu,
                                            setFormattedMenu,
                                          ]}
                                          level="third"
                                        ></Menu>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Child */}
                </li>
              )
            )}
            {/* END: First Child */}
            <Divider type="div" className="my-6"></Divider>
            <li>
              <a
                className="cursor-pointer h-[50px] flex items-center pl-3 text-white mb-1 relative rounded-full [&amp;>div:nth-child(1)]:hover:before:bg-white/5 [&amp;>div:nth-child(1)]:hover:before:dark:bg-darkmode-500/70 opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-80"
                onClick={() => logout()}
              >
                <div className="dark:text-slate-400 before:content-[''] before:z-[-1] before:w-[230px] before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-full before:transition before:ease-in before:duration-100"></div>
                <div className="hidden xl:flex items-center w-full ml-3 dark:text-slate-400">
                  <Lucide className="mr-2" icon="LogOut" />
                  Logout
                </div>
              </a>
            </li>
          </ul>
        </nav>
        {/* END: Side Menu */}
        {/* BEGIN: Content */}
        <div className="rounded-[30px] min-w-0 min-h-screen flex-1 pb-10 bg-slate-100 dark:bg-darkmode-700 px-4 md:px-[22px] max-w-full md:max-w-auto before:content-[''] before:w-full before:h-px before:block">
          {/* <TopBar /> */}
          <CustomNotification />
          <Outlet />
        </div>
        {/* END: Content */}
      </div>
    </div>
  );
}

function Menu(props: {
  className?: string;
  menu: FormattedMenu;
  formattedMenuState: [
    (FormattedMenu | "divider")[],
    Dispatch<SetStateAction<(FormattedMenu | "divider")[]>>
  ];
  level: "first" | "second" | "third";
}) {
  const navigate = useNavigate();
  const [formattedMenu, setFormattedMenu] = props.formattedMenuState;

  return (
    <SideMenuTooltip
      as="a"
      content={props.menu.title}
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "h-[50px] flex items-center pl-5 text-white mb-1 relative rounded-full",
        {
          "dark:text-slate-300": props.menu.active && props.level != "first",
          "text-white/70 dark:text-slate-400":
            !props.menu.active && props.level != "first",
          "z-10 bg-slate-100 dark:bg-darkmode-700":
            props.menu.active && props.level == "first",
          "before:content-[''] before:w-[30px] before:h-[30px] before:-mt-[30px] before:rotate-90 before:scale-[1.04] before:bg-[length:100%] before:bg-menu-corner before:absolute before:top-0 before:right-0 before:-mr-5 dark:before:bg-menu-corner-dark":
            props.menu.active && props.level == "first",
          "after:content-[''] after:w-[30px] after:h-[30px] after:mt-[50px] after:scale-[1.04] after:bg-[length:100%] after:bg-menu-corner after:absolute after:top-0 after:right-0 after:-mr-5 dark:after:bg-menu-corner-dark":
            props.menu.active && props.level == "first",
          "[&>div:nth-child(1)]:hover:before:bg-white/5 [&>div:nth-child(1)]:hover:before:dark:bg-darkmode-500/70":
            !props.menu.active &&
            !props.menu.activeDropdown &&
            props.level == "first",
        },
        props.className,
      ])}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        linkTo(props.menu, navigate);
        setFormattedMenu([...formattedMenu]);
      }}
    >
      <div
        className={clsx({
          "text-primary dark:text-slate-300":
            props.menu.active && props.level == "first",
          "dark:text-slate-400": !props.menu.active && props.level == "first",
          "before:content-[''] before:z-[-1] before:absolute before:top-0 before:right-0 before:-mr-5 before:w-12 before:h-full before:bg-slate-100 before:dark:bg-darkmode-700":
            props.menu.active && props.level == "first",
          "before:content-[''] before:z-[-1] before:w-[230px] before:absolute before:top-0 before:left-0 before:h-full before:rounded-l-full before:transition before:ease-in before:duration-100":
            !props.menu.activeDropdown &&
            !props.menu.active &&
            props.level == "first",
        })}
      >
        <Lucide icon={props.menu.icon} />
      </div>
      <div
        className={clsx([
          "hidden xl:flex items-center w-full ml-3",
          { "font-medium": props.menu.active && props.level != "first" },
          {
            "text-slate-800 font-medium dark:text-slate-300":
              props.menu.active && props.level == "first",
          },
          {
            "dark:text-slate-400": !props.menu.active && props.level == "first",
          },
        ])}
      >
        {props.menu.title}
        {props.menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 ml-auto mr-5 hidden xl:block",
              { "transform rotate-180": props.menu.activeDropdown },
            ])}
          >
            <Lucide className="w-4 h-4" icon="ChevronDown" />
          </div>
        )}
      </div>
    </SideMenuTooltip>
  );
}

function Divider<C extends React.ElementType>(
  props: { as?: C } & React.ComponentPropsWithoutRef<C>
) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07]",
      ])}
    ></Component>
  );
}

export default Main;
