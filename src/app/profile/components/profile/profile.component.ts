import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "../../../core";
// import { EXAMS } from "../../data/exams";
// import { SUBJECTS } from "../../data/subject";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  data: any;
  headerData: any;
  introData: any;
  aboutData: any;
  examsData: any;
  subjectsData: any;
  collegeData: any;
  coachingData: any;
  awardData: any;
  certificationData: any;
  internshipData: any;
  publicationData: any;
  specialisationData: any;
  presenceData: any;
  addressData: any;
  additionalData: any;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  getHeaderData(data) {
    const {
      userdetail,
      count_posts = 0,
      count_groups = 0,
      count_connections = 0,
      account_type = 0,
    } = data;
    const { original, name } = userdetail;
    return {
      original,
      name,
      account_type,
      count_posts,
      count_groups,
      count_connections,
    };
  }

  getIntroData(data) {
    const {
      userdetail,
      account_type,
      latestedu,
      teachingsince,
      teachingat,
      classes_teaching,
      hometown,
      state,
      country,
      current_city,
      birthday,
    } = data;
    const { username, headline, type } = userdetail;
    return {
      username,
      headline,
      type,
      account_type,
      latestedu,
      teachingsince,
      teachingat,
      classes_teaching,
      hometown,
      state,
      country,
      current_city,
      birthday,
    };
  }

  getAboutData(data) {
    const { account_type, summary } = data;
    return { account_type, summary };
  }

  getExamData(data) {
    const { exam = [], account_type } = data;
    return { exam, account_type };
  }

  getSubjectData(data) {
    const { subject = [], account_type } = data;
    return { subject, account_type };
  }

  getCollegeData(data) {
    const { college = [], account_type } = data;
    return { college, account_type };
  }

  getCoachingData(data) {
    const { coaching = [], account_type } = data;
    return { coaching, account_type };
  }

  getAwardData(data) {
    const { award = [], account_type } = data;
    return { award, account_type };
  }

  getCertificationData(data) {
    const { certification = [], account_type } = data;
    return { certification, account_type };
  }

  getInternshipData(data) {
    const { internship = [], account_type } = data;
    return { internship, account_type };
  }

  getPublicationData(data) {
    const { publication = [], account_type } = data;
    return { publication, account_type };
  }

  getSpecialisationData(data) {
    const { specialisation = [], account_type } = data;
    return { specialisation, account_type };
  }

  getPresenceData(data) {
    const { presence = {}, account_type } = data;
    return { presence, account_type };
  }

  getAddressData(data) {
    const { address = {}, account_type } = data;
    return { address, account_type };
  }

  getAdditionalData(data) {
    const { additional_details = {} } = data;
    return { ...additional_details };
  }

  ngOnInit() {
    this.data = this.route.snapshot.data.data;
    this.headerData = this.getHeaderData(this.data);
    this.introData = this.getIntroData(this.data);
    this.aboutData = this.getAboutData(this.data);
    this.examsData = this.getExamData(this.data);
    this.subjectsData = this.getSubjectData(this.data);
    this.collegeData = this.getCollegeData(this.data);
    this.coachingData = this.getCoachingData(this.data);
    this.awardData = this.getAwardData(this.data);
    this.certificationData = this.getCertificationData(this.data);
    this.internshipData = this.getInternshipData(this.data);
    this.publicationData = this.getPublicationData(this.data);
    this.specialisationData = this.getSpecialisationData(this.data);
    this.presenceData = this.getPresenceData(this.data);
    this.addressData = this.getAddressData(this.data);
    this.additionalData = this.getAdditionalData(this.data);
    console.log(this.data);
  }
}
