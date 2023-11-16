import { IFormSelectorData } from "../types/formSelector.types";

export const formSelectorData: IFormSelectorData = {
  formElementSelectors: [
    {
      id: "name",
      selector: `.bl-text-field__inner > [name="name"]`,
      type: "input",
    },

    {
      id: "email",
      selector: `.bl-text-field__inner > [name="email"]`,
      type: "input",
    },

    {
      id: "propertyName",
      selector: `.bl-text-field__inner > [name="merek"]`,
      type: "input",
    },

    {
      id: "regNo",
      selector: `.bl-text-field__inner > [name="nomor_registrasi"]`,
      type: "input",
    },

    {
      id: "ownerName",
      selector: `.bl-text-field__inner > [name="nama_pemilik"]`,
      type: "input",
    },

    {
      id: "isOwner",
      selector: `[name="pemilik_haki_"]`,
      type: "radio",
    },

    {
      id: "informantsRelationship",
      selector: `[name="hubungan_pelapor"]`,
      type: "input",
    },

    {
      id: "nameOfReportingCompany",
      selector: `[name="nama_perusahaan"]`,
      type: "input",
    },

    {
      id: "reportingCompanyWebsite",
      selector: `[name="website_perusahaan"]`,
      type: "input",
    },

    {
      id: "reportingCompanyAddress",
      selector: `[name="alamat_perusahaan"]`,
      type: "input",
    },

    {
      id: "propertyOwerEmail",
      selector: `[name="alamat_email_pemilik_merek"]`,
      type: "input",
    },

    {
      id: "informantsPhoneNo",
      selector: `[name="no_telepon_pelapor"]`,
      type: "input",
    },

    {
      id: "productLink",
      selector: `[name="link_barang"]`,
      type: "input",
    },

    {
      id: "productDetails",
      selector: `[name="body"]`,
      type: "input",
    },

    {
      id: "moreProductsListFile",
      selector: `[name="link_barang_banyak"]`,
      type: "file",
    },

    {
      id: "proofOfPropertyFile",
      selector: `[name="surat_kepemilikan_merek"]`,
      type: "file",
    },

    {
      id: "proofOfPowerOfAttorneyFile",
      selector: `[name="bukti_surat_kuasa"]`,
      type: "file",
    },

    {
      id: "proofOfDirectSelling",
      selector: `[name="bukti_surat_izin_usaha"]`,
      type: "file",
    },

    {
      id: "agreementDeclaration",
      selector: `input[type="checkbox"]`,
      type: "checkbox",
    },
  ],
  submitSelector: `button[type="submit"]`,
};
