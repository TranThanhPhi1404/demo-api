import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListUserComponent } from './list-user/list-user.component'; 
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainComponent } from './main/main.component';
import { SendComponent } from './send/send.component';
import { CampaignComponent } from './campaign/campaign.component';
export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'main',
        component: MainComponent
    },
    {
        path: 'send',
        component: SendComponent
    },
    {
        path: 'campaign',
        component: CampaignComponent
    },
    {
        path: 'list',
        component: ListUserComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'add',
        component: AddUserComponent      
    },
    {
        path: 'edit/:sdt',
        component: EditUserComponent
    },
    {
        path: 'delete/:sdt',
        component: DeleteUserComponent
    }

];
