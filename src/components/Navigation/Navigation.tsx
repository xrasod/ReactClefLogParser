import * as React from "react";
import {MegaMenu} from "primereact/megamenu";

const Navigation: React.FC = () => {
    return (
       <MegaMenu model={[
              {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                items: [
                     [
                          {
                            label: 'New',
                            icon: 'pi pi-fw pi-plus',
                            items: [
                                 {label: 'Project'},
                                 {label: 'Other'},
                            ],
                          },
                          {
                            label: 'Open',
                            icon: 'pi pi-fw pi-external-link',
                            items: [
                                 {label: 'Home'},
                                 {label: 'Other'},
                            ],
                          },
                     ],
                     [
                          {
                            label: 'Quit', icon: 'pi pi-fw pi-times',
                          },
                     ],
                ],
              },
              {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                     [
                          {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-trash',
                            items: [
                                 {label: 'Delete', icon: 'pi pi-fw pi-times'},
                                 {label: 'Remove', icon: 'pi pi-fw pi-minus'},
                            ],
                          },
                          {
                            label: 'Refresh',
                            icon: 'pi pi-fw pi-refresh',
                          },
                     ],
                ],
              },
              {
                label: 'Help',
                icon: 'pi pi-fw pi-question',
                items: [
                     [
                          {
                            label: 'Contents',
                          },
                          {
                            label: 'Search', icon: 'pi pi-fw pi-search',
                            items: [
                                 {
                                      label: 'Text',
                                      items: [
                                        {
                                             label: 'Workspace',
                                        },
                                      ],
                                 },
                                 {
                                      label: 'User',
                                      items: [
                                        {
                                             label: 'Profile',
                                        },
                                      ],
                                 },
                            ],
                          },
                     ],
                ],
              },
              {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog',
                items: [
                     [
                          {
                            label: 'Edit',
                            icon: 'pi pi-fw pi-pencil',
                            items: [
                                 {label: 'Save', icon: 'pi pi-fw pi-save'},
                                 {label: 'Update', icon: 'pi pi-fw pi-save'},
                            ],
                          },
                          {
                            label: 'Other',
                            icon: 'pi pi-fw pi-tags',
                            items: [
                                 {label: 'Delete', icon: 'pi pi-fw pi-minus'},
                            ],
                          },
                     ],
                     [
                          {
                            label: 'Quit', icon: 'pi pi-fw pi-times',
                            },
                        ],
                ],
                },
            ]}
        />
        
    );
}
export default Navigation;