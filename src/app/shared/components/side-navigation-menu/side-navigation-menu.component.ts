import { Component, NgModule, Output, Input, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DxTreeViewModule, DxTreeViewComponent, DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import { navigation } from '../../../app-navigation';

import * as events from 'devextreme/events';
import { AuthService } from '../../services';
import { StoreX } from '../../../libs/store';
import { AuthData } from '../../../models/auth-data';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [DxTreeViewModule],
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements AfterViewInit, OnDestroy {
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;
  user: string = '';
  authData = StoreX.session.getObj<AuthData | null>('auth');

  @Output()
  selectedItemChanged = new EventEmitter<DxTreeViewTypes.ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();

  private _selectedItem!: String;
  @Input()
  set selectedItem(value: String) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items!: Record<string, unknown>[];
  get items() {
    if (!this._items) {
      this._items = navigation.map((item) => {
        if (item.path && !(/^\//.test(item.path))) {
          item.path = `/${item.path}`;
        }
        return { ...item, expanded: !this._compactMode }
      });

      if (this.authData?.user.role != 'admin') {
        const freePages = (<Array<any>>this._items).filter(o => !!!o.role);

        if (this.authData?.user.padre == null) {
          let authPages = (<Array<any>>this._items).filter(o => o.role == 'client');
          this._items = [...freePages, ...authPages]
        } else {
          this._items = freePages;
        }
      }
    }

    return this._items;
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  constructor(private elementRef: ElementRef, protected auth: AuthService,
    private router: Router) { }

  onItemClick(event: DxTreeViewTypes.ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });

    if (this.authData != null) {
      this.user = this.authData.user.userName;
    }
  }

  onPerfilClick = async () => {
    await this.router.navigate(["/perfil"]);
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}