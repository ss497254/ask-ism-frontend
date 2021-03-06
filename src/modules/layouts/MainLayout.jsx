import React from "react";
// import { useConn } from "../../shared-hooks/useConn";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { MainInnerGrid } from "../../ui/layout/MainGrid";
import { Banner } from "../../ui/components/Banner";
import { AccountOverlay } from "../../ui/mobile/AccountOverlay";
import { ProfileHeader } from "../../ui/mobile/MobileHeader";
import { MobileNav } from "../../ui/mobile/MobileNav";
import { ProfileBlockController } from "./ProfileBlockController";
import { LeftPanel, RightPanel, MiddlePanel } from "./GridPanels";

export const MainLayout = ({ children }) => {
    const screenType = useScreenType();
    console.count("Main layout rendered");

    let middle = children,
        defaultMobileHeader = null,
        moblieNavigationBar = null;

    switch (screenType) {
        case "xl-desktop":
            middle = (
                <>
                    <LeftPanel />
                    <MiddlePanel>{children}</MiddlePanel>
                    <RightPanel>
                        <ProfileBlockController />
                    </RightPanel>
                </>
            );
            break;
        case "desktop":
            middle = (
                <>
                    <LeftPanel />
                    <MiddlePanel>{children}</MiddlePanel>
                    <RightPanel>
                        <ProfileBlockController />
                    </RightPanel>
                </>
            );
            break;
        case "tablet-landscape":
            middle = (
                <>
                    <LeftPanel tablet />
                    <MiddlePanel>{children}</MiddlePanel>
                    <RightPanel>
                        <ProfileBlockController />
                    </RightPanel>
                </>
            );
            break;
        case "tablet":
            middle = (
                <>
                    <LeftPanel tablet />
                    <MiddlePanel>{children}</MiddlePanel>
                </>
            );
            break;
        case "mobile":
            defaultMobileHeader = (
                <ProfileHeader
                    avatar={"/img/ss497254.png"}
                    onAnnouncementsClick={() => {}}
                />
            );
            middle = (
                <>
                    {children}
                    <AccountOverlay />
                </>
            );
            moblieNavigationBar = <MobileNav />;
    }

    return (
        <>
            {!!defaultMobileHeader && (
                <div className={`fixed left-0 top-0 w-full z-50 h-6.5`}>
                    {defaultMobileHeader}
                </div>
            )}
            <div
                className={`relative mx-auto ${
                    !!defaultMobileHeader ? "my-6.5" : ""
                }`}
            >
                <MainInnerGrid screenType={screenType}>{middle}</MainInnerGrid>
                <Banner />
            </div>
            {moblieNavigationBar}
        </>
    );
};
