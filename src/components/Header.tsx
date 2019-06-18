import React from 'react';

import accessibleStyles from '@patternfly/patternfly/utilities/Accessibility/accessibility.css';
import spacingStyles from '@patternfly/patternfly/utilities/Spacing/spacing.css';
import { css } from '@patternfly/react-styles';
import { BellIcon, CogIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';

import {
  ApplicationLauncher,
  Avatar,
  Brand,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownGroup,
  DropdownSeparator,
  KebabToggle,
  PageHeader,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Tooltip
} from '@patternfly/react-core';

import imgBrand from '../images/imgBrand.png';
import imgAvatar from '../images/imgAvatar.svg';
import threeScaleLogo from '../images/3scale.svg';
import mongodbLogo from '../images/mongodb.svg';
import openshiftLogo from '../images/openshift.svg';
import shadownmanLogo from '../images/shadowman.svg';
import awsLogo from '../images/aws.png';
import kafkaLogo from '../images/kafka.svg';
import defaultLogo from '../images/default-logo.svg';

const defaultLink = 'http://google.com';

const externalApplicationCategories = [
  {
    id: 'multi-cluster-manager',
    title: 'Multi-Cluster Manager',
    image: openshiftLogo,
    link: defaultLink
  },
  {
    title: 'Red Hat Applications',
    applications: [
      {
        title: 'OpenShift Logging',
        link: defaultLink,
        image: openshiftLogo
      },
      {
        title: 'OpenShift Services Mesh',
        link: defaultLink,
        image: openshiftLogo
      },
      {
        title: 'RedHat 3 Scale',
        link: defaultLink,
        image: threeScaleLogo
      },
      {
        title: 'Red Hat Fuse',
        link: defaultLink,
        image: shadownmanLogo
      },
      {
        title: 'SkyDive',
        link: defaultLink,
        image: defaultLogo
      }
    ]
  },
  {
    title: '3rd Party Applications',
    applications: [
      {
        title: 'AWS',
        link: defaultLink,
        image: awsLogo
      },
      {
        title: 'Kafka',
        link: defaultLink,
        image: kafkaLogo
      },
      {
        title: 'Mongo',
        link: defaultLink,
        image: mongodbLogo
      }
    ]
  },
  {
    title: 'Customer Applications',
    applications: [
      {
        title: 'Application 1',
        link: defaultLink,
        image: defaultLogo
      },
      {
        title: 'Application 2',
        link: defaultLink,
        image: defaultLogo
      },
      {
        title: 'Application 3',
        link: defaultLink,
        image: defaultLogo
      }
    ]
  }
];

export class Header extends React.Component {
  state = {
    isDropdownOpen: false,
    isPerspectiveDropdownOpen: false,
    isAppLauncherOpen: false,
    isKebabDropdownOpen: false
  };

  onDropdownToggle = isDropdownOpen => {
    this.setState({
      isDropdownOpen
    });
  };

  onDropdownSelect = event => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  };

  onKebabDropdownToggle = isKebabDropdownOpen => {
    this.setState({
      isKebabDropdownOpen
    });
  };

  onKebabDropdownSelect = event => {
    this.setState({
      isKebabDropdownOpen: !this.state.isKebabDropdownOpen
    });
  };

  onAppLauncherToggle = () => {
    this.setState({
      isAppLauncherOpen: !this.state.isAppLauncherOpen
    });
  };

  onLinkAndLaunch = () => {
    this.setState({ isAppLauncherOpen: false });
  };

  renderAppLauncherLink = (title, image, href, tooltip = null) => {
    const dropdownItem = (
      <DropdownItem key={title} isAppLauncher onClick={this.onLinkAndLaunch}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="pf-c-nav__link app-launcher-launch-item"
        >
          <img src={image} alt="" className="app-launcher-launch-item__image" />
          {title}
          <ExternalLinkAltIcon className="pf-u-ml-md external-link-nav-item__icon" />
        </a>
      </DropdownItem>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{dropdownItem}</Tooltip>;
    }

    return dropdownItem;
  };

  renderApplicationLauncherItems = () => {
    const { isAppLauncherOpen } = this.state;

    const launcherItems:any[] = [];

    if (!isAppLauncherOpen) {
      return launcherItems;
    }

    externalApplicationCategories.forEach((category, index) => {
      if (index > 0 && (category.applications || externalApplicationCategories[index - 1].applications)) {
        launcherItems.push(<DropdownSeparator key={`separator-${index}`} />);
      }

      if (!category.applications) {
        launcherItems.push(this.renderAppLauncherLink(category.title, category.image, defaultLink));
      } else {
        launcherItems.push(
          <DropdownGroup key={category.title} label={category.title} className="app-launcher-group">
            {category.applications.map(application =>
              this.renderAppLauncherLink(application.title, application.image, defaultLink)
            )}
          </DropdownGroup>
        );
      }
    });

    return launcherItems;
  };

  render() {
    const { isDropdownOpen, isAppLauncherOpen, isKebabDropdownOpen } = this.state;

    const kebabDropdownItems = [
      <DropdownItem key="1">
        <BellIcon /> Notifications
      </DropdownItem>,
      <DropdownItem key="2">
        <CogIcon /> Settings
      </DropdownItem>
    ];

    const userDropdownItems = [
      <DropdownItem key="1">Link</DropdownItem>,
      <DropdownItem key="2" component="button">
        Action
      </DropdownItem>,
      <DropdownItem key="3" isDisabled>
        Disabled Link
      </DropdownItem>,
      <DropdownItem key="4" isDisabled component="button">
        Disabled Action
      </DropdownItem>,
      <DropdownSeparator key="5" />,
      <DropdownItem key="6">Separated Link</DropdownItem>,
      <DropdownItem key="7" component="button">
        Separated Action
      </DropdownItem>
    ];

    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnLg)}>
          <ToolbarItem>
            <ApplicationLauncher
              id="app-launcher"
              isOpen={isAppLauncherOpen}
              onToggle={this.onAppLauncherToggle}
              dropdownItems={this.renderApplicationLauncherItems()}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Button id="expanded-example-uid-01" aria-label="Notifications actions" variant={ButtonVariant.plain}>
              <BellIcon />
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button id="expanded-example-uid-02" aria-label="Settings actions" variant={ButtonVariant.plain}>
              <CogIcon />
            </Button>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem className={css(accessibleStyles.hiddenOnLg, spacingStyles.mr_0)}>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onKebabDropdownSelect}
              toggle={<KebabToggle onToggle={this.onKebabDropdownToggle} />}
              isOpen={isKebabDropdownOpen}
              dropdownItems={kebabDropdownItems}
            />
          </ToolbarItem>
          <ToolbarItem className={css(accessibleStyles.screenReader, accessibleStyles.visibleOnMd)}>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onDropdownSelect}
              isOpen={isDropdownOpen}
              toggle={<DropdownToggle onToggle={this.onDropdownToggle}>Ima User</DropdownToggle>}
              dropdownItems={userDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    return (
      <PageHeader
        logo={<Brand src={imgBrand} alt="Patternfly Logo" />}
        toolbar={PageToolbar}
        avatar={<Avatar src={imgAvatar} alt="Avatar image" />}
        showNavToggle
      />
    );
  }
}
