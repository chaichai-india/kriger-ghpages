import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ApiService, ProfileService } from "./services";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService, ProfileService]
})
export class CoreModule {}
