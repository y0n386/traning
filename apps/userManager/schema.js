exports.signUp = function (headers, data) {
  switch (data.type) {
    case 'real':
      return {
        type: 'object',
        properties: {
          type: {
            inArray: ['real'],
            errorMessages: {
              inArray: 'نوع پروفایل معتبر نمی‌باشد!'
            }
          },
          firstName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام معتبر نمی‌باشد!'
            }
          },
          lastName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام خانوادگی معتبر نمی‌باشد!'
            }
          },
          gender: {
            inArray: ['', 0, '0', 1, '1'],
            errorMessages: {
              inArray: 'جنسیت معتبر نمی‌باشد!'
            }
          },
          maritalStatus: {
            inArray: ['', 0, '0', 1, '1'],
            errorMessages: {
              inArray: 'وضعیت تاهل معتبر نمی‌باشد!'
            }
          },
          fatherName: {
            persianAlpha: [' ', '‌', ''],
            errorMessages: {
              persianAlpha: 'نام پدر معتبر نمی‌باشد!'
            }
          },
          identityNumber: {
            anyOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'شماره شناسنامه معتبر نمی‌باشد!'
                }
              },
              {
                integer: [1],
                errorMessages: {
                  integer: 'شماره شناسنامه معتبر نمی‌باشد!',
                  minimum: 'شماره شناسنامه باید عددی بزرگتر از صفر باشد!'
                }
              },
              {
                integerString: ['1'],
                errorMessages: {
                  integerString: 'شماره شناسنامه معتبر نمی‌باشد!',
                  minimum: 'شماره شناسنامه باید عددی بزرگتر از صفر باشد!'
                }
              },
              {
                inArray: [data.idNumber],
                errorMessages: {
                  inArray: 'شماره شناسنامه معتبر نمی‌باشد!'
                }
              }
            ]
          },
          issuedFrom: {
            persianAlpha: [' ', '‌', ''],
            errorMessages: {
              persianAlpha: 'محل صدور شناسنامه معتبر نمی‌باشد!'
            }
          },
          identitySerialNumber: {
            oneOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'سریال شناسنامه معتبر نمی‌باشد!'
                }
              },
              {
                identitySerialNumber: [],
                errorMessages: {
                  identitySerialNumber: 'سریال شناسنامه معتبر نمی‌باشد!'
                }
              }
            ]
          },
          idNumber: {
            nationalCode: [],
            errorMessages: {
              nationalCode: 'کد ملی معتبر نمی‌باشد!'
            }
          },
          birthday: {
            oneOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'تاریخ تولد معتبر نمی‌باشد!'
                }
              },
              {
                jalaliDate: [],
                errorMessages: {
                  jalaliDate: 'تاریخ تولد معتبر نمی‌باشد!'
                }
              }
            ]
          },
          education: {
            persianAlpha: [' ', '-', '‌', ''],
            errorMessages: {
              persianAlpha: 'تحصیلات معتبر نمی‌باشد!'
            }
          },
          email: {
            email: [],
            errorMessages: {
              email: 'رایانامه معتبر نمی‌باشد!'
            }
          },
          cellphoneNumbers: {
            type: 'array',
            items: {
              type: "object",
              properties: {
                id: {},
                value: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          value: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          value: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شماره تلفن همراه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      value: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            value: {
                              inArray: [undefined]
                            }
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان شماره تلفن همراه را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      value: {
                        inArray: [undefined]
                      }
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت شماره تلفن همراه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      value: {
                        mobile: [],
                        errorMessages: {
                          mobile: 'شماره تلفن همراه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          addresses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                province: {},
                city: {},
                street: {},
                alley: {},
                number: {},
                address: {},
                postalCode: {},
                tels: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات آدرس معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      province: {inArray: [undefined]},
                      city: {inArray: [undefined]},
                      street: {inArray: [undefined]},
                      alley: {inArray: [undefined]},
                      number: {inArray: [undefined]},
                      address: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه آدرس معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            province: {inArray: [undefined]},
                            city: {inArray: [undefined]},
                            street: {inArray: [undefined]},
                            alley: {inArray: [undefined]},
                            number: {inArray: [undefined]},
                            address: {inArray: [undefined]},
                            postalCode: {inArray: [undefined]},
                            tels: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان آدرس را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      province: {inArray: [undefined]},
                      city: {inArray: [undefined]},
                      street: {inArray: [undefined]},
                      alley: {inArray: [undefined]},
                      number: {inArray: [undefined]},
                      address: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت آدرس معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      province: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام استان معتبر نمی‌باشد!'
                        }
                      },
                      city: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام شهر معتبر نمی‌باشد!'
                        }
                      },
                      street: {
                        persianAlpha: [' ', '‌', ''],
                        errorMessages: {
                          persianAlpha: 'نام خیابان معتبر نمی‌باشد!'
                        }
                      },
                      alley: {
                        persianAlphaNumeric: [' ', '‌', ''],
                        errorMessages: {
                          persianAlphaNumeric: 'نام کوچه معتبر نمی‌باشد!'
                        }
                      },
                      number: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'شماره پلاک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1],
                            errorMessages: {
                              integer: 'شماره پلاک معتبر نمی‌باشد!',
                              minimum: 'شماره پلاک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1'],
                            errorMessages: {
                              integerString: 'شماره پلاک معتبر نمی‌باشد!',
                              minimum: 'شماره پلاک معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      address: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '(', ')', '+', '/', '\\', '،', '.', ',',
                          '\'', '"', '«', '»', '<', '>', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'آدرس معتبر نمی‌باشد!'
                        }
                      },
                      postalCode: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'کد پستی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1000000000, 9999999999],
                            errorMessages: {
                              integer: 'کد پستی معتبر نمی‌باشد!',
                              minimum: 'کد پستی معتبر نمی‌باشد!',
                              maximum: 'کد پستی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1000000000', '9999999999'],
                            errorMessages: {
                              integerString: 'کد پستی معتبر نمی‌باشد!',
                              minimum: 'کد پستی معتبر نمی‌باشد!',
                              maximum: 'کد پستی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      tels: {
                        type: 'array',
                        items: {
                          type: "object",
                          properties: {
                            id: {},
                            value: {},
                            deleted: {}
                          },
                          switch: [
                            {
                              if: {
                                anyOf: [
                                  {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  {
                                    properties: {
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  }
                                ]
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {inArray: [undefined]},
                                  value: {inArray: [undefined]},
                                  deleted: {inArray: [true, "true", 1, "1"]}
                                }
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                not: {
                                  oneOf: [
                                    {
                                      properties: {
                                        value: {
                                          inArray: [undefined]
                                        }
                                      }
                                    },
                                    {
                                      properties: {
                                        deleted: {
                                          inArray: [undefined]
                                        }
                                      }
                                    }
                                  ]
                                }

                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'نمی‌توان شماره تلفن ثابت را همزمان مقداردهی و حذف کرد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  value: {
                                    inArray: [undefined]
                                  }
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  },
                                  deleted: {
                                    inArray: [true, "true", 1, "1"],
                                    errorMessages: {
                                      inArray: 'وضعیت شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  deleted: {inArray: [undefined]}
                                }
                              },
                              then: {
                                properties: {
                                  value: {
                                    phone: [],
                                    errorMessages: {
                                      phone: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            }
                          ],
                          additionalProperties: false
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          tradingCode: {
            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\',
              '،', '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
            errorMessages: {
              persianEnglishAlphaNumeric: 'کد بورسی معتبر نمی‌باشد!'
            }
          },
          knowledgeLevel: {
            persianAlpha: [' ', '،', '-', '‌', ''],
            errorMessages: {
              persianAlpha: 'میزان آشنایی با بورس معتبر نمی‌باشد!'
            }
          },
          hasTrading: {
            inArray: ['', 0, '0', 1, '1'],
            errorMessages: {
              inArray: 'وضعیت سابقه خرید و فروش در بورس معتبر نمی‌باشد!'
            }
          },
          brokerageCompanyName: {
            persianAlpha: [' ', '،', '-', '‌', ''],
            errorMessages: {
              persianAlpha: 'نام شرکت(های) کارگزاری معتبر نمی‌باشد!'
            }
          },
          jobs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                job: {},
                post: {},
                averageSalary: {},
                companyName: {},
                companyActivity: {},
                postalCode: {},
                tels: {},
                faxes: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          job: {inArray: [undefined]},
                          post: {inArray: [undefined]},
                          averageSalary: {inArray: [undefined]},
                          companyName: {inArray: [undefined]},
                          companyActivity: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          job: {inArray: [undefined]},
                          post: {inArray: [undefined]},
                          averageSalary: {inArray: [undefined]},
                          companyName: {inArray: [undefined]},
                          companyActivity: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات شغل معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      job: {inArray: [undefined]},
                      post: {inArray: [undefined]},
                      averageSalary: {inArray: [undefined]},
                      companyName: {inArray: [undefined]},
                      companyActivity: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]},
                      faxes: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه شغل معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            job: {inArray: [undefined]},
                            post: {inArray: [undefined]},
                            averageSalary: {inArray: [undefined]},
                            companyName: {inArray: [undefined]},
                            companyActivity: {inArray: [undefined]},
                            postalCode: {inArray: [undefined]},
                            tels: {inArray: [undefined]},
                            faxes: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان شغل را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      job: {inArray: [undefined]},
                      post: {inArray: [undefined]},
                      averageSalary: {inArray: [undefined]},
                      companyName: {inArray: [undefined]},
                      companyActivity: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]},
                      faxes: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه شغل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه شغل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت شغل معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شغل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شغل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      job: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'شغل معتبر نمی‌باشد!'
                        }
                      },
                      post: {
                        persianAlpha: [' ', '‌', ''],
                        errorMessages: {
                          persianAlpha: 'سِمت معتبر نمی‌باشد!'
                        }
                      },
                      averageSalary: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'میانگین حقوق ماهیانه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1000],
                            errorMessages: {
                              integer: 'میانگین حقوق ماهانه معتبر نمی‌باشد!',
                              minimum: 'میانگین حقوق ماهانه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1000'],
                            errorMessages: {
                              integerString: 'میانگین حقوق ماهانه معتبر نمی‌باشد!',
                              minimum: 'میانگین حقوق ماهانه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      companyName: {
                        persianAlphaNumeric: [' ', '‌'],
                        errorMessages: {
                          persianAlphaNumeric: 'نام شرکت معتبر نمی‌باشد!'
                        }
                      },
                      companyActivity: {
                        persianAlphaNumeric: [' ', '‌', ''],
                        errorMessages: {
                          persianAlphaNumeric: 'ماهیت فعالیت شرکت معتبر نمی‌باشد!'
                        }
                      },
                      postalCode: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'کد پستی محل کار معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1000000000, 9999999999],
                            errorMessages: {
                              integer: 'کد پستی محل کار معتبر نمی‌باشد!',
                              minimum: 'کد پستی محل کار معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1000000000', '9999999999'],
                            errorMessages: {
                              integerString: 'کد پستی محل کار معتبر نمی‌باشد!',
                              minimum: 'کد پستی محل کار معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      tels: {
                        type: 'array',
                        items: {
                          type: "object",
                          properties: {
                            id: {},
                            value: {},
                            deleted: {}
                          },
                          switch: [
                            {
                              if: {
                                anyOf: [
                                  {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  {
                                    properties: {
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  }
                                ]
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'تلفن محل کار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {inArray: [undefined]},
                                  value: {inArray: [undefined]},
                                  deleted: {inArray: [true, "true", 1, "1"]}
                                }
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شناسه تلفن محل کار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                not: {
                                  oneOf: [
                                    {
                                      properties: {
                                        value: {
                                          inArray: [undefined]
                                        }
                                      }
                                    },
                                    {
                                      properties: {
                                        deleted: {
                                          inArray: [undefined]
                                        }
                                      }
                                    }
                                  ]
                                }

                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'نمی‌توان تلفن محل کار را همزمان مقداردهی و حذف کرد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  value: {
                                    inArray: [undefined]
                                  }
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  },
                                  deleted: {
                                    inArray: [true, "true", 1, "1"],
                                    errorMessages: {
                                      inArray: 'وضعیت تلفن محل کار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {not: {inArray: [undefined]}}
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              continue: true
                            },
                            {
                              if: {
                                properties: {
                                  deleted: {inArray: [undefined]}
                                }
                              },
                              then: {
                                properties: {
                                  value: {
                                    phone: [],
                                    errorMessages: {
                                      phone: 'تلفن محل کار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            }
                          ],
                          additionalProperties: false
                        }
                      },
                      faxes: {
                        type: 'array',
                        items: {
                          type: "object",
                          properties: {
                            id: {},
                            value: {},
                            deleted: {}
                          },
                          switch: [
                            {
                              if: {
                                anyOf: [
                                  {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  {
                                    properties: {
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  }
                                ]
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شماره دورنگار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {inArray: [undefined]},
                                  value: {inArray: [undefined]},
                                  deleted: {inArray: [true, "true", 1, "1"]}
                                }
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                not: {
                                  oneOf: [
                                    {
                                      properties: {
                                        value: {
                                          inArray: [undefined]
                                        }
                                      }
                                    },
                                    {
                                      properties: {
                                        deleted: {
                                          inArray: [undefined]
                                        }
                                      }
                                    }
                                  ]
                                }

                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'نمی‌توان شماره دورنگار را همزمان مقداردهی و حذف کرد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  value: {
                                    inArray: [undefined]
                                  }
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  },
                                  deleted: {
                                    inArray: [true, "true", 1, "1"],
                                    errorMessages: {
                                      inArray: 'وضعیت شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {not: {inArray: [undefined]}}
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              continue: true
                            },
                            {
                              if: {
                                properties: {
                                  deleted: {inArray: [undefined]}
                                }
                              },
                              then: {
                                properties: {
                                  value: {
                                    phone: [],
                                    errorMessages: {
                                      phone: 'شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            }
                          ],
                          additionalProperties: false
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          assets: {
            oneOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'میزان دارایی معتبر نمی‌باشد!'
                }
              },
              {
                integer: [0],
                errorMessages: {
                  integer: 'میزان دارایی معتبر نمی‌باشد!',
                  minimum: 'میزان دارایی معتبر نمی‌باشد!'
                }
              },
              {
                integerString: ['0'],
                errorMessages: {
                  integerString: 'میزان دارایی معتبر نمی‌باشد!',
                  minimum: 'میزان دارایی معتبر نمی‌باشد!'
                }
              }
            ]
          },
          accounts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                bankName: {},
                branchName: {},
                branchCode: {},
                accountType: {},
                accountNumber: {},
                shebaNumber: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      bankName: {inArray: [undefined]},
                      branchName: {inArray: [undefined]},
                      branchCode: {inArray: [undefined]},
                      accountType: {inArray: [undefined]},
                      accountNumber: {inArray: [undefined]},
                      shebaNumber: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            bankName: {inArray: [undefined]},
                            branchName: {inArray: [undefined]},
                            branchCode: {inArray: [undefined]},
                            accountType: {inArray: [undefined]},
                            accountNumber: {inArray: [undefined]},
                            shebaNumber: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان حساب بانکی را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      bankName: {inArray: [undefined]},
                      branchName: {inArray: [undefined]},
                      branchCode: {inArray: [undefined]},
                      accountType: {inArray: [undefined]},
                      accountNumber: {inArray: [undefined]},
                      shebaNumber: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه حساب معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه حساب معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      bankName: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام بانک معتبر نمی‌باشد!'
                        }
                      },
                      branchName: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام شعبه بانک معتبر نمی‌باشد!'
                        }
                      },
                      branchCode: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'کد شعبه بانک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1],
                            errorMessages: {
                              integer: 'کد شعبه بانک معتبر نمی‌باشد!',
                              minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1'],
                            errorMessages: {
                              integerString: 'کد شعبه بانک معتبر نمی‌باشد!',
                              minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      accountType: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نوع حساب بانکی معتبر نمی‌باشد!'
                        }
                      },
                      accountNumber: {
                        match: [/^((\d+(\.\d+)*)|(\d+(-\d+)*)|(\d+(\/\d+)*))$/],
                        errorMessages: {
                          match: 'شماره حساب معتبر نمی‌باشد!'
                        }
                      },
                      shebaNumber: {
                        match: [/^IR\d{24}$/],
                        errorMessages: {
                          match: 'شماره شبای حساب معتبر نمی‌باشد!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          profilePictures: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل شناسنامه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل تصویر پروفایل را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای تصویر پروفایل معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          identityCards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل شناسنامه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل شناسنامه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل شناسنامه را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای شناسنامه معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای شناسنامه کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای شناسنامه بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          idCards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل کارت ملی معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل کارت ملی معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل کارت ملی را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: [0],
                            errorMessages: {
                              integerString: 'شناسه فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای کارت ملی معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای کارت ملی کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای کارت ملی بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          accountStatements: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل صورت وضعیت حساب یا دفترچه حساب را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای صورت وضعیت حساب یا دفترچه حساب کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای صورت وضعیت حساب یا دفترچه حساب بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          username: {
          },
          password: {
            password: [],
            errorMessages: {
              password: 'نام کاربری معتبر نمی‌باشد!'
            }
          },
        },
        required: [
          'type',
          'username',
          'firstName',
          'lastName',
          'email',
          'cellphoneNumbers'
        ],
        additionalProperties: false
      };
    case 'legal':
      switch (data.legalType) {
        case 'normal':
          return {
            type: 'object',
            properties: {
              registerType: {
                alphaNumeric: [],
                errorMessages: {
                  alphaNumeric: 'نوع ثبت نام معتبر نمی‌باشد!'
                }
              },
              type: {
                inArray: ['legal'],
                errorMessages: {
                  inArray: 'نوع پروفایل معتبر نمی‌باشد!'
                }
              },
              legalType: {
                inArray: ['normal'],
                errorMessages: {
                  inArray: 'نوع پروفایل حقوقی معتبر نمی‌باشد!'
                }
              },
              status: {
                persianEnglishAlphaNumeric: [' ', '‌', '', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_',
                  '+', '=', '/', '\\', '،', '؛', '.', ',', '`', '|', ';', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']',
                  '{', '}'],
                errorMessages: {
                  persianEnglishAlphaNumeric: 'وضعیت معتبر نمی‌باشد!'
                }
              },
              companyName: {
                persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
                errorMessages: {
                  persianEnglishAlphaNumeric: 'نام شرکت معتبر نمی‌باشد!'
                }
              },
              activityField: {
                persianAlpha: [' ', '‌', ''],
                errorMessages: {
                  persianAlpha: 'زمینه‌ی فعالیت معتبر نمی‌باشد!'
                }
              },
              registrationNumber: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'شماره ثبت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integer: [1],
                    errorMessages: {
                      integer: 'شماره ثبت معتبر نمی‌باشد!',
                      minimum: 'شماره ثبت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integerString: ['1'],
                    errorMessages: {
                      integerString: 'شماره ثبت معتبر نمی‌باشد!',
                      minimum: 'شماره ثبت معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              registrationPlace: {
                persianAlpha: [' ', '‌', ''],
                errorMessages: {
                  persianAlpha: 'محل ثبت معتبر نمی‌باشد!'
                }
              },
              registrationDate: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'تاریخ ثبت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    jalaliDate: [],
                    errorMessages: {
                      jalaliDate: 'تاریخ ثبت معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              nationalId: {
                integerString: ['10000000000', '19999999999'],
                errorMessages: {
                  integerString: 'شناسه ملی معتبر نمی‌باشد!',
                  minimum: 'شناسه ملی معتبر نمی‌باشد!',
                  maximum: 'شناسه ملی معتبر نمی‌باشد!'
                }
              },
              economicCode: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'کد اقتصادی معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integer: [1],
                    errorMessages: {
                      integer: 'کد اقتصادی معتبر نمی‌باشد!',
                      minimum: 'کد اقتصادی معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integerString: ['1'],
                    errorMessages: {
                      integerString: 'کد اقتصادی معتبر نمی‌باشد!',
                      minimum: 'کد اقتصادی معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              email: {
                email: [],
                errorMessages: {
                  email: 'رایانامه معتبر نمی‌باشد!'
                }
              },
              website: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'آدرس اینترنتی شرکت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    url: [],
                    errorMessages: {
                      url: 'آدرس اینترنتی شرکت معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              addresses: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    province: {},
                    city: {},
                    street: {},
                    alley: {},
                    number: {},
                    address: {},
                    postalCode: {},
                    tels: {},
                    faxes: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              province: {inArray: [undefined]},
                              city: {inArray: [undefined]},
                              street: {inArray: [undefined]},
                              alley: {inArray: [undefined]},
                              number: {inArray: [undefined]},
                              address: {inArray: [undefined]},
                              postalCode: {inArray: [undefined]},
                              tels: {inArray: [undefined]},
                              faxes: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              province: {inArray: [undefined]},
                              city: {inArray: [undefined]},
                              street: {inArray: [undefined]},
                              alley: {inArray: [undefined]},
                              number: {inArray: [undefined]},
                              address: {inArray: [undefined]},
                              postalCode: {inArray: [undefined]},
                              tels: {inArray: [undefined]},
                              faxes: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات آدرس معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه آدرس معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                province: {inArray: [undefined]},
                                city: {inArray: [undefined]},
                                street: {inArray: [undefined]},
                                alley: {inArray: [undefined]},
                                number: {inArray: [undefined]},
                                address: {inArray: [undefined]},
                                postalCode: {inArray: [undefined]},
                                tels: {inArray: [undefined]},
                                faxes: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان آدرس را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت آدرس معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {not: {inArray: [undefined]}}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          }
                        }
                      },
                      continue: true
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          province: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام استان معتبر نمی‌باشد!'
                            }
                          },
                          city: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام شهر معتبر نمی‌باشد!'
                            }
                          },
                          street: {
                            persianAlpha: [' ', '‌', ''],
                            errorMessages: {
                              persianAlpha: 'نام خیابان معتبر نمی‌باشد!'
                            }
                          },
                          alley: {
                            persianAlphaNumeric: [' ', '‌', ''],
                            errorMessages: {
                              persianAlphaNumeric: 'نام کوچه معتبر نمی‌باشد!'
                            }
                          },
                          number: {
                            oneOf: [
                              {
                                inArray: [''],
                                errorMessages: {
                                  inArray: 'شماره پلاک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integer: [1],
                                errorMessages: {
                                  integer: 'شماره پلاک معتبر نمی‌باشد!',
                                  minimum: 'شماره پلاک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['1'],
                                errorMessages: {
                                  integerString: 'شماره پلاک معتبر نمی‌باشد!',
                                  minimum: 'شماره پلاک معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          address: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '(', ')', '+', '/', '\\', '،', '.', ',',
                              '\'', '"', '«', '»', '<', '>', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'آدرس معتبر نمی‌باشد!'
                            }
                          },
                          postalCode: {
                            oneOf: [
                              {
                                inArray: [''],
                                errorMessages: {
                                  inArray: 'کد پستی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integer: [1000000000, 9999999999],
                                errorMessages: {
                                  integer: 'کد پستی معتبر نمی‌باشد!',
                                  minimum: 'کد پستی معتبر نمی‌باشد!',
                                  maximum: 'کد پستی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['1000000000', '9999999999'],
                                errorMessages: {
                                  integerString: 'کد پستی معتبر نمی‌باشد!',
                                  minimum: 'کد پستی معتبر نمی‌باشد!',
                                  maximum: 'کد پستی معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          tels: {
                            type: 'array',
                            items: {
                              type: "object",
                              properties: {
                                id: {},
                                value: {},
                                deleted: {}
                              },
                              switch: [
                                {
                                  if: {
                                    anyOf: [
                                      {
                                        properties: {
                                          id: {inArray: [undefined]},
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      },
                                      {
                                        properties: {
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      }
                                    ]
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [true, "true", 1, "1"]}
                                    }
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    not: {
                                      oneOf: [
                                        {
                                          properties: {
                                            value: {
                                              inArray: [undefined]
                                            }
                                          }
                                        },
                                        {
                                          properties: {
                                            deleted: {
                                              inArray: [undefined]
                                            }
                                          }
                                        }
                                      ]
                                    }

                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'نمی‌توان شماره تلفن ثابت را همزمان مقداردهی و حذف کرد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      value: {
                                        inArray: [undefined]
                                      }
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      },
                                      deleted: {
                                        inArray: [true, "true", 1, "1"],
                                        errorMessages: {
                                          inArray: 'وضعیت شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {not: {inArray: [undefined]}}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  },
                                  continue: true
                                },
                                {
                                  if: {
                                    properties: {
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      value: {
                                        phone: [],
                                        errorMessages: {
                                          phone: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                }
                              ],
                              additionalProperties: false
                            }
                          },
                          faxes: {
                            type: 'array',
                            items: {
                              type: "object",
                              properties: {
                                id: {},
                                value: {},
                                deleted: {}
                              },
                              switch: [
                                {
                                  if: {
                                    anyOf: [
                                      {
                                        properties: {
                                          id: {inArray: [undefined]},
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      },
                                      {
                                        properties: {
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      }
                                    ]
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [true, "true", 1, "1"]}
                                    }
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    not: {
                                      oneOf: [
                                        {
                                          properties: {
                                            value: {
                                              inArray: [undefined]
                                            }
                                          }
                                        },
                                        {
                                          properties: {
                                            deleted: {
                                              inArray: [undefined]
                                            }
                                          }
                                        }
                                      ]
                                    }

                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'نمی‌توان شماره دورنگار را همزمان مقداردهی و حذف کرد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      value: {
                                        inArray: [undefined]
                                      }
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      },
                                      deleted: {
                                        inArray: [true, "true", 1, "1"],
                                        errorMessages: {
                                          inArray: 'وضعیت شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {not: {inArray: [undefined]}}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه‌ی دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی دورنگار معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه‌ی دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی دورنگار معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  },
                                  continue: true
                                },
                                {
                                  if: {
                                    properties: {
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      value: {
                                        phone: [],
                                        errorMessages: {
                                          phone: 'شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                }
                              ],
                              additionalProperties: false
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              tradingCode: {
                persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\',
                  '،', '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                errorMessages: {
                  persianEnglishAlphaNumeric: 'کد بورسی معتبر نمی‌باشد!'
                }
              },
              accounts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    bankName: {},
                    branchName: {},
                    branchCode: {},
                    accountType: {},
                    accountNumber: {},
                    shebaNumber: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              bankName: {inArray: [undefined]},
                              branchName: {inArray: [undefined]},
                              branchCode: {inArray: [undefined]},
                              accountType: {inArray: [undefined]},
                              accountNumber: {inArray: [undefined]},
                              shebaNumber: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              bankName: {inArray: [undefined]},
                              branchName: {inArray: [undefined]},
                              branchCode: {inArray: [undefined]},
                              accountType: {inArray: [undefined]},
                              accountNumber: {inArray: [undefined]},
                              shebaNumber: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات حساب معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه حساب معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                bankName: {inArray: [undefined]},
                                branchName: {inArray: [undefined]},
                                branchCode: {inArray: [undefined]},
                                accountType: {inArray: [undefined]},
                                accountNumber: {inArray: [undefined]},
                                shebaNumber: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [true, "true", 1, "1"]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان حساب بانکی را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه حساب معتبر نمی‌باشد!',
                                  minimum: 'شناسه حساب معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه حساب معتبر نمی‌باشد!',
                                  minimum: 'شناسه حساب معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت حساب معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        properties: {
                          bankName: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام بانک معتبر نمی‌باشد!'
                            }
                          },
                          branchName: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام شعبه بانک معتبر نمی‌باشد!'
                            }
                          },
                          branchCode: {
                            oneOf: [
                              {
                                inArray: [''],
                                errorMessages: {
                                  inArray: 'کد شعبه بانک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integer: [1],
                                errorMessages: {
                                  integer: 'کد شعبه بانک معتبر نمی‌باشد!',
                                  minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['1'],
                                errorMessages: {
                                  integerString: 'کد شعبه بانک معتبر نمی‌باشد!',
                                  minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          accountType: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نوع حساب بانکی معتبر نمی‌باشد!'
                            }
                          },
                          accountNumber: {
                            match: [/^((\d+(\.\d+)*)|(\d+(-\d+)*)|(\d+(\/\d+)*))$/],
                            errorMessages: {
                              match: 'شماره حساب معتبر نمی‌باشد!'
                            }
                          },
                          shebaNumber: {
                            match: [/^IR\d{24}$/],
                            errorMessages: {
                              match: 'شماره شبای حساب معتبر نمی‌باشد!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت حساب معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              tradingViaInternet: {
                inArray: [0, '0', 1, '1'],
                errorMessages: {
                  inArray: 'وضعیت درخواست خرید و فروش از طریق اینترنت معتبر نمی‌باشد!'
                }
              },
              profilePictures: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل تصویر پروفایل را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {not: {inArray: [undefined]}}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          }
                        }
                      },
                      continue: true
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای تصویر پروفایل معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              establishmentAnnouncements: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل آگهی تاسیس شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای آگهی تاسیس شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای آگهی تاسیس شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای آگهی تاسیس شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              officialGazettes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل روزنامه رسمی شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای روزنامه رسمی شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای روزنامه رسمی شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای روزنامه رسمی شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              latestChanges: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل آخرین تغییرات شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای آخرین تغییرات شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای آخرین تغییرات شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای آخرین تغییرات شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              inquiryAnnouncements: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل آگهی استعلام سامانه شماره شناسه ملی را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای آگهی استعلام سامانه شماره شناسه ملی کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای آگهی استعلام سامانه شماره شناسه ملی بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              assessments: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل اساسنامه شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل اساسنامه شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای اساسنامه شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای اساسنامه شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای اساسنامه شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              idCards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              identityCards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              economicCodes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل کد اقتصادی شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای کد اقتصادی شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای کد اقتصادی شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای کد اقتصادی شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              gettingTradingCodeRequests: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای نامه از شرکت در سربرگ جهت اخذ کد بورسی کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای نامه از شرکت در سربرگ جهت اخذ کد بورسی بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              introductionLetterForEnvoys: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              }
            },
            required: [
              'type',
              'legalType',
              'username',
              'email',
              'addresses',
              'activityField',
              'registrationNumber',
              'registrationDate',
              'establishmentAnnouncements',
              'latestChanges',
              'companyName'
            ],
            additionalProperties: false
          };
        case 'bourse':
        case 'governmental':
        case 'unofficial':
        default:
          return {
            alwaysInvalid: [],
            errorMessages: {
              alwaysInvalid: 'نوع پروفایل حقوقی معتبر نمی باشد!'
            }
          };
      }
      break;
    default:
      return {
        alwaysInvalid: [],
        errorMessages: {
          alwaysInvalid: 'نوع پروفایل معتبر نمی باشد!'
        }
      };
  }
};
exports.editProfile = function (headers, data) {
  return {
    oneOf: [
      {
        type: 'object',
        properties: {
          firstName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام کاربر معتبر نمیباشد!   حروف فارسی وارد شود'
            }
          },
          lastName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام خانوادگی کاربر معتبر نمیباشد!   حروف فارسی وارد شود'
            }
          },
          gender: {
            inArray: [0, 1],
            errorMessages: {
              inArray: 'جنسیت کاربر معتبر نمیباشد!   0 یا 1'
            }
          },
          fatherName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام پدر معتبر نمیباشد!   حروف فارسی وارد شود'
            }
          },
          identityNumber: {
            numeric: [1],
            errorMessages: {
              numeric: 'شماره شناسنامه کاربر معتبر نمیباشد!  عدد صحیح باشد '
            }
          },
          identitySerialNumber: {
            identitySerialNumber: [],
            errorMessages: {
              identitySerialNumber: 'سریال شناسنامه معتبر نمیباشد!  عدد صحیح باشد '
            }
          },
          idNumber: {
            nationalCode: [],
            errorMessages: {
              nationalCode: 'کد ملی معتبر نمیباشد!'
            }
          },
          birthday: {
            jalaliDate: [],
            errorMessages: {
              jalaliDate: 'تاریخ تولد معتبر نمیباشد!'
            }
          },
          education: {
            persianAlpha: [' ', '-', '‌'],
            errorMessages: {
              persianAlpha: 'تحصیلات معتبر نمیباشد!   حروف فارسی وارد شود'
            }
          },
          email: {
            email: [],
            errorMessages: {
              email: 'رایانامه معتبر نمیباشد!'
            }
          },
          cellphoneNumbers: {
            type: 'array',
            items: {
              type: "object",
              properties: {
                id: {},
                value: {},
                status: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          value: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          value: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شماره تلفن همراه معتبر نمیباشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      value: {inArray: [undefined]},
                      status: {inArray: ["deleted"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه شماره تلفن همراه معتبر نمیباشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            value: {
                              inArray: [undefined]
                            }
                          }
                        },
                        {
                          properties: {
                            status: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان شماره تلفن همراه را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      value: {
                        inArray: [undefined]
                      }
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه شماره تلفن همراه معتبر نمیباشد!',
                          minimum: 'شناسه شماره تلفن همراه معتبر نمیباشد!'
                        }
                      },
                      status: {
                        inArray: ["deleted"],
                        errorMessages: {
                          inArray: 'وضعیت شماره تلفن همراه معتبر نمیباشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه‌ی شماره تلفن همراه معتبر نمیباشد!',
                          minimum: 'شناسه‌ی شماره تلفن همراه معتبر نمیباشد!'
                        }
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      value: {
                        mobile: [],
                        errorMessages: {
                          mobile: 'شماره تلفن همراه معتبر نمیباشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            },
            minItems: 1
          },
          addresses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  integer: [0],
                  errorMessages: {
                    integer: 'شناسه آدرس معتبر نیست!'
                  }
                },
                province: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'نام استان معتبر نمیباشد!'
                  }
                },
                city: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'نام شهر معتبر نمیباشد!'
                  }
                },
                street: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'نام خیابان معتبر نمیباشد!'
                  }
                },
                alley: {
                  persianAlphaNumeric: [' ', '‌'],
                  errorMessages: {
                    persianAlphaNumeric: 'نام کوچه معتبر نمیباشد!'
                  }
                },
                number: {
                  integer: [1],
                  errorMessages: {
                    integer: 'شماره پلاک معتبر نمیباشد!',
                    minimum: 'شماره پلاک معتبر نمیباشد!'
                  }
                },
                address: {
                  notEmpty: [],
                  errorMessages: {
                    notEmpty: 'آدرس معتبر نمیباشد!'
                  }
                },
                postalCode: {
                  integer: [1000000000, 9999999999],
                  errorMessages: {
                    integer: 'کد پستی معتبر نمیباشد!',
                    minimum: 'کد پستی معتبر نمیباشد!',
                    maximum: 'کد پستی معتبر نمیباشد!'
                  }
                },
                tels: {
                  type: 'array',
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه معتبر نیست!  address.tels'
                        }
                      },
                      value: {
                        phone: [],
                        errorMessages: {
                          phone: 'شماره تلفن ثابت معتبر نمیباشد!'
                        }
                      }
                    },
                    required: ['value'],
                    additionalProperties: false
                  },
                  minItems: 1
                }
              },
              required: [
                'province',
                'city'
              ],
              additionalProperties: false
            },
            minItems: 1
          },
          tradingCode: {
            integer: [1],
            errorMessages: {
              integer: 'کد بورسی معتبر نمیباشد!',
              minimum: 'کد بورسی معتبر نمیباشد!'
            }
          },
          hasTrading: {
            inArray: [0, 1],
            errorMessages: {
              inArray: 'وضعیت سابقه خرید و فروش در بورس معتبر نمیباشد!   0 یا 1'
            }
          },
          jobs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  integer: [0],
                  errorMessages: {
                    integer: 'شناسه کار معتبر نیست!'
                  }
                },
                job: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'شغل معتبر نمیباشد!'
                  }
                },
                post: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'سِمت معتبر نمیباشد!'
                  }
                },
                averageSalary: {
                  integer: [1000],
                  errorMessages: {
                    integer: 'میانگین حقوق ماهانه معتبر نمیباشد!',
                    minimum: 'میانگین حقوق ماهانه معتبر نمیباشد!'
                  }
                },
                companyName: {
                  persianAlphaNumeric: [' ', '‌'],
                  errorMessages: {
                    persianAlphaNumeric: 'نام شرکت معتبر نمیباشد!'
                  }
                },
                companyActivity: {
                  persianAlphaNumeric: [' ', '‌'],
                  errorMessages: {
                    persianAlphaNumeric: 'ماهیت فعالیت شرکت معتبر نمیباشد!'
                  }
                },
                postalCode: {
                  integer: [1000000000, 9999999999],
                  errorMessages: {
                    integer: 'کد پستی محل کار معتبر نمیباشد!',
                    minimum: 'کد پستی محل کار معتبر نمیباشد!'
                  }
                },
                tels: {
                  type: 'array',
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه معتبر نیست!  jobs.tels'
                        }
                      },
                      value: {
                        phone: [],
                        errorMessages: {
                          phone: 'تلفن محل کار معتبر نمیباشد!'
                        }
                      }
                    },
                    additionalProperties: false
                  },
                  minItems: 1
                },
                faxes: {
                  type: 'array',
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه معتبر نیست!  jobs.faxes'
                        }
                      },
                      value: {
                        phone: [],
                        errorMessages: {
                          phone: 'شماره دورنگار معتبر نمیباشد!'
                        }
                      }
                    },
                    additionalProperties: false
                  },
                  minItems: 1
                }
              },
              required: [
                'job'
              ],
              additionalProperties: false
            },
            minItems: 1
          },
          idCards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {}
              },
              required: [
                'name',
                'description',
                'data'
              ],
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: ["deleted"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            status: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                          minimum: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      },
                      status: {
                        inArray: ["deleted"],
                        errorMessages: {
                          inArray: 'وضعیت فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_', '،', '.'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت بیشتر از حد مجاز است!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            },
            minItems: 1
          },
          identityCards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: ["deleted"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            status: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                          minimum: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      },
                      status: {
                        inArray: ["deleted"],
                        errorMessages: {
                          inArray: 'وضعیت فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_', '،', '.'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت بیشتر از حد مجاز است!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            },
            minItems: 1
          }
        },
        additionalProperties: false
      },
      {
        type: 'object',
        properties: {
          companyName: {
            persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
            errorMessages: {
              persianEnglishAlphaNumeric: 'نام شرکت معتبر نمی‌باشد!'
            }
          },
          website: {
            url: [],
            errorMessages: {
              url: 'آدرس اینترنتی معتبر نمیباشد!'
            }
          },
          email: {
            email: [],
            errorMessages: {
              email: 'رایانامه معتبر نمیباشد!'
            }
          },
          addresses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  integer: [0],
                  errorMessages: {
                    integer: 'شناسه آدرس معتبر نیست!'
                  }
                },
                province: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'نام استان معتبر نمیباشد!'
                  }
                },
                city: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'نام شهر معتبر نمیباشد!'
                  }
                },
                street: {
                  persianAlpha: [' ', '‌'],
                  errorMessages: {
                    persianAlpha: 'نام خیابان معتبر نمیباشد!'
                  }
                },
                alley: {
                  persianAlphaNumeric: [' ', '‌'],
                  errorMessages: {
                    persianAlphaNumeric: 'نام کوچه معتبر نمیباشد!'
                  }
                },
                number: {
                  integer: [1],
                  errorMessages: {
                    integer: 'شماره پلاک معتبر نمیباشد!',
                    minimum: 'شماره پلاک معتبر نمیباشد!'
                  }
                },
                address: {
                  notEmpty: [' ', '،', '-', '‌'],
                  errorMessages: {
                    notEmpty: 'آدرس معتبر نمیباشد!'
                  }
                },
                postalCode: {
                  integer: [1000000000, 9999999999],
                  errorMessages: {
                    integer: 'کد پستی معتبر نمیباشد!',
                    minimum: 'کد پستی معتبر نمیباشد!',
                    maximum: 'کد پستی معتبر نمیباشد!'
                  }
                },
                tels: {
                  type: 'array',
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        phone: [],
                        errorMessages: {
                          phone: 'شماره تلفن ثابت معتبر نمیباشد!'
                        }
                      }
                    },
                    required: ['value'],
                    additionalProperties: false
                  },
                  minItems: 1
                }
              },
              required: [
                'province',
                'city',
                'address'
              ],
              additionalProperties: true
            },
            minItems: 1
          },
          activityField: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'زمینه‌ی فعالیت معتبر نمیباشد!   حروف فارسی وارد شود'
            }
          },
          registrationNumber: {
            integer: [1],
            errorMessages: {
              integer: 'شماره ثبت معتبر نمیباشد!   عدد صحیح وارد شود'
            }
          },
          registrationDate: {
            jalaliDate: [],
            errorMessages: {
              jalaliDate: 'تاریخ ثبت معتبر نمیباشد!'
            }
          },
          nationalId: {
            integerString: ['1'],
            errorMessages: {
              integerString: 'شماره شناسه ملی معتبر نمیباشد!',
              minimum: 'شماره شناسه ملی معتبر نمیباشد!'
            }
          },
          establishmentAnnouncements: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل آگهی تاسیس شرکت معتبر نمیباشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: ["deleted"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل آگهی تاسیس شرکت معتبر نمیباشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            status: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل آگهی تاسیس شرکت را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه فایل آگهی تاسیس شرکت معتبر نمیباشد!',
                          minimum: 'شناسه فایل آگهی تاسیس شرکت معتبر نمیباشد!'
                        }
                      },
                      status: {
                        inArray: ["deleted"],
                        errorMessages: {
                          inArray: 'وضعیت فایل آگهی تاسیس شرکت معتبر نمیباشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آگهی تاسیس شرکت معتبر نمیباشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_', '،', '.'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل آگهی تاسیس شرکت معتبر نمیباشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای آگهی تاسیس شرکت معتبر نمیباشد!',
                          minSize: 'حجم فایل بارگذاری شده برای آگهی تاسیس شرکت کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای آگهی تاسیس شرکت بیشتر از حد مجاز است!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            },
            minItems: 1
          },
          latestChanges: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل آخرین تغییرات شرکت معتبر نمیباشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: ["deleted"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل آخرین تغییرات شرکت معتبر نمیباشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            status: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل آخرین تغییرات شرکت را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        integer: [0],
                        errorMessages: {
                          integer: 'شناسه فایل آخرین تغییرات شرکت معتبر نمیباشد!',
                          minimum: 'شناسه فایل آخرین تغییرات شرکت معتبر نمیباشد!'
                        }
                      },
                      status: {
                        inArray: ["deleted"],
                        errorMessages: {
                          inArray: 'وضعیت فایل آخرین تغییرات شرکت معتبر نمیباشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آخرین تغییرات شرکت معتبر نمیباشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: ['', ' ', '‌', '-', '_', '،', '.'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل آخرین تغییرات شرکت معتبر نمیباشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای آخرین تغییرات شرکت معتبر نمیباشد!',
                          minSize: 'حجم فایل بارگذاری شده برای آخرین تغییرات شرکت کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای آخرین تغییرات شرکت بیشتر از حد مجاز است!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            },
            minItems: 1
          }
        },
        additionalProperties: false
      }
    ]
  }
};
exports.loginData = function (headers, data) {
  return {
    type: 'object',
    properties: {
      username: {},
      password: {},
      mobile: {},
      rememberMe: {
        inArray: [true, false, 'true', 'false'],
        errorMessages: {
          inArray: 'مرا به خاطر بسپار معتبر نمی‌باشد!'
        }
      },
      captcha: {
        type: 'object',
        properties: {
          value: {},
          token: {}
        },
        required: [
          'value'
        ],
        additionalProperties: false
      }
    },
    additionalProperties: false
  };
};
exports.checkAuthenticatePack = function (headers, data) {
  return {
    type: 'object',
    properties: {
      username: {
      },
      captcha: {
        type: 'object',
        properties: {
          value: {},
          token: {}
        },
        required: [
          'value'
        ],
        additionalProperties: false
      }
    },
    required: [
      'username'
    ],
    additionalProperties: false
  };
};
exports.checkProfile = function (headers, data) {
  return {
    type: 'object',
    properties: {
      uniqueKey: {
        alphaNumeric: ['-', '_'],
        errorMessages: {
          alphaNumeric: 'uniqueKey معتبر نمی‌باشد!'
        }
      },
      idNumber: {
        nationalCode: [],
        errorMessages: {
          nationalCode: 'کد ملی معتبر نمی‌باشد!'
        }
      },
      nationalId: {
        integerString: ['10000000000', '19999999999'],
        errorMessages: {
          integerString: 'شناسه ملی معتبر نمی‌باشد!',
          minimum: 'شناسه ملی معتبر نمی‌باشد!',
          maximum: 'شناسه ملی معتبر نمی‌باشد!'
        }
      },
      captcha: {
        type: 'object',
        properties: {
          value: {},
          token: {}
        },
        required: [
          'value'
        ],
        additionalProperties: false
      }
    },
    additionalProperties: false
  };
};
exports.changeAuthenticatePack = function (headers, data) {
  return {
    type:'object',
    properties:{},
    required:['newAuthenticatePack','oldAuthenticatePack']
  };
};
exports.setPassData = function (headers, data) {
  return {
    type: 'object',
    properties: {
      newPassword: {
        password: ['-', '_', '.'],
        errorMessages: {
          password: 'رمز عبور جدید معتبر نمی‌باشد!'
        }
      },
      captcha: {
        type: 'object',
        properties: {},
        required: [
          'token',
          'value'
        ],
        additionalProperties: true
      }
    },
    required: [
      'token',
      'username',
      'newPassword'
    ],
    additionalProperties: true
  };
};
exports.forgetPassword = function (headers, data) {
  return {
    type: 'object',
    properties: {
      username: {
      },
      captcha: {
        type: 'object',
        properties: {},
        required: [
          'token',
          'value'
        ],
        additionalProperties: true
      }
    },
    required: [
      'username'
    ],
    additionalProperties: true
  }
};
exports.addProfile = function (headers, data) {
  switch (data.type) {
    case 'real':
      return {
        type: 'object',
        properties: {
          type: {
            inArray: ['real'],
            errorMessages: {
              inArray: 'نوع پروفایل معتبر نمی‌باشد!'
            }
          },
          firstName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام معتبر نمی‌باشد!'
            }
          },
          status: {
            persianEnglishAlphaNumeric: [' ', '‌', '', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_',
              '+', '=', '/', '\\', '،', '؛', '.', ',', '`', '|', ';', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']',
              '{', '}'],
            errorMessages: {
              persianEnglishAlphaNumeric: 'وضعیت معتبر نمی‌باشد!'
            }
          },
          lastName: {
            persianAlpha: [' ', '‌'],
            errorMessages: {
              persianAlpha: 'نام خانوادگی معتبر نمی‌باشد!'
            }
          },
          gender: {
            inArray: ['', 0, '0', 1, '1'],
            errorMessages: {
              inArray: 'جنسیت معتبر نمی‌باشد!'
            }
          },
          maritalStatus: {
            inArray: ['', 0, '0', 1, '1'],
            errorMessages: {
              inArray: 'وضعیت تاهل معتبر نمی‌باشد!'
            }
          },
          fatherName: {
            persianAlpha: [' ', '‌', ''],
            errorMessages: {
              persianAlpha: 'نام پدر معتبر نمی‌باشد!'
            }
          },
          identityNumber: {
            anyOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'شماره شناسنامه معتبر نمی‌باشد!'
                }
              },
              {
                integer: [1],
                errorMessages: {
                  integer: 'شماره شناسنامه معتبر نمی‌باشد!',
                  minimum: 'شماره شناسنامه باید عددی بزرگتر از صفر باشد!'
                }
              },
              {
                integerString: ['1'],
                errorMessages: {
                  integerString: 'شماره شناسنامه معتبر نمی‌باشد!',
                  minimum: 'شماره شناسنامه باید عددی بزرگتر از صفر باشد!'
                }
              },
              {
                inArray: [data.idNumber],
                errorMessages: {
                  inArray: 'شماره شناسنامه معتبر نمی‌باشد!'
                }
              }
            ]
          },
          issuedFrom: {
            persianAlpha: [' ', '‌', ''],
            errorMessages: {
              persianAlpha: 'محل صدور شناسنامه معتبر نمی‌باشد!'
            }
          },
          identitySerialNumber: {
            oneOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'سریال شناسنامه معتبر نمی‌باشد!'
                }
              },
              {
                identitySerialNumber: [],
                errorMessages: {
                  identitySerialNumber: 'سریال شناسنامه معتبر نمی‌باشد!'
                }
              }
            ]
          },
          idNumber: {
            nationalCode: [],
            errorMessages: {
              nationalCode: 'کد ملی معتبر نمی‌باشد!'
            }
          },
          birthday: {
            oneOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'تاریخ تولد معتبر نمی‌باشد!'
                }
              },
              {
                jalaliDate: [],
                errorMessages: {
                  jalaliDate: 'تاریخ تولد معتبر نمی‌باشد!'
                }
              }
            ]
          },
          education: {
            persianAlpha: [' ', '-', '‌', ''],
            errorMessages: {
              persianAlpha: 'تحصیلات معتبر نمی‌باشد!'
            }
          },
          email: {
            email: [],
            errorMessages: {
              email: 'رایانامه معتبر نمی‌باشد!'
            }
          },
          cellphoneNumbers: {
            type: 'array',
            items: {
              type: "object",
              properties: {
                id: {},
                value: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          value: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          value: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شماره تلفن همراه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      value: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            value: {
                              inArray: [undefined]
                            }
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان شماره تلفن همراه را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      value: {
                        inArray: [undefined]
                      }
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت شماره تلفن همراه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شماره تلفن همراه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      value: {
                        mobile: [],
                        errorMessages: {
                          mobile: 'شماره تلفن همراه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          addresses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                province: {},
                city: {},
                street: {},
                alley: {},
                number: {},
                address: {},
                postalCode: {},
                tels: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات آدرس معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      province: {inArray: [undefined]},
                      city: {inArray: [undefined]},
                      street: {inArray: [undefined]},
                      alley: {inArray: [undefined]},
                      number: {inArray: [undefined]},
                      address: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه آدرس معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            province: {inArray: [undefined]},
                            city: {inArray: [undefined]},
                            street: {inArray: [undefined]},
                            alley: {inArray: [undefined]},
                            number: {inArray: [undefined]},
                            address: {inArray: [undefined]},
                            postalCode: {inArray: [undefined]},
                            tels: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان آدرس را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      province: {inArray: [undefined]},
                      city: {inArray: [undefined]},
                      street: {inArray: [undefined]},
                      alley: {inArray: [undefined]},
                      number: {inArray: [undefined]},
                      address: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت آدرس معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      province: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام استان معتبر نمی‌باشد!'
                        }
                      },
                      city: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام شهر معتبر نمی‌باشد!'
                        }
                      },
                      street: {
                        persianAlpha: [' ', '‌', ''],
                        errorMessages: {
                          persianAlpha: 'نام خیابان معتبر نمی‌باشد!'
                        }
                      },
                      alley: {
                        persianAlphaNumeric: [' ', '‌', ''],
                        errorMessages: {
                          persianAlphaNumeric: 'نام کوچه معتبر نمی‌باشد!'
                        }
                      },
                      number: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'شماره پلاک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1],
                            errorMessages: {
                              integer: 'شماره پلاک معتبر نمی‌باشد!',
                              minimum: 'شماره پلاک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1'],
                            errorMessages: {
                              integerString: 'شماره پلاک معتبر نمی‌باشد!',
                              minimum: 'شماره پلاک معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      address: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '(', ')', '+', '/', '\\', '،', '.', ',',
                          '\'', '"', '«', '»', '<', '>', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'آدرس معتبر نمی‌باشد!'
                        }
                      },
                      postalCode: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'کد پستی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1000000000, 9999999999],
                            errorMessages: {
                              integer: 'کد پستی معتبر نمی‌باشد!',
                              minimum: 'کد پستی معتبر نمی‌باشد!',
                              maximum: 'کد پستی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1000000000', '9999999999'],
                            errorMessages: {
                              integerString: 'کد پستی معتبر نمی‌باشد!',
                              minimum: 'کد پستی معتبر نمی‌باشد!',
                              maximum: 'کد پستی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      tels: {
                        type: 'array',
                        items: {
                          type: "object",
                          properties: {
                            id: {},
                            value: {},
                            deleted: {}
                          },
                          switch: [
                            {
                              if: {
                                anyOf: [
                                  {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  {
                                    properties: {
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  }
                                ]
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {inArray: [undefined]},
                                  value: {inArray: [undefined]},
                                  deleted: {inArray: [true, "true", 1, "1"]}
                                }
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                not: {
                                  oneOf: [
                                    {
                                      properties: {
                                        value: {
                                          inArray: [undefined]
                                        }
                                      }
                                    },
                                    {
                                      properties: {
                                        deleted: {
                                          inArray: [undefined]
                                        }
                                      }
                                    }
                                  ]
                                }

                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'نمی‌توان شماره تلفن ثابت را همزمان مقداردهی و حذف کرد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  value: {
                                    inArray: [undefined]
                                  }
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  },
                                  deleted: {
                                    inArray: [true, "true", 1, "1"],
                                    errorMessages: {
                                      inArray: 'وضعیت شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  deleted: {inArray: [undefined]}
                                }
                              },
                              then: {
                                properties: {
                                  value: {
                                    phone: [],
                                    errorMessages: {
                                      phone: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            }
                          ],
                          additionalProperties: false
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          tradingCode: {
            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\',
              '،', '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
            errorMessages: {
              persianEnglishAlphaNumeric: 'کد بورسی معتبر نمی‌باشد!'
            }
          },
          knowledgeLevel: {
            persianAlpha: [' ', '،', '-', '‌', ''],
            errorMessages: {
              persianAlpha: 'میزان آشنایی با بورس معتبر نمی‌باشد!'
            }
          },
          hasTrading: {
            inArray: ['', 0, '0', 1, '1'],
            errorMessages: {
              inArray: 'وضعیت سابقه خرید و فروش در بورس معتبر نمی‌باشد!'
            }
          },
          brokerageCompanyName: {
            persianAlpha: [' ', '،', '-', '‌', ''],
            errorMessages: {
              persianAlpha: 'نام شرکت(های) کارگزاری معتبر نمی‌باشد!'
            }
          },
          jobs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                job: {},
                post: {},
                averageSalary: {},
                companyName: {},
                companyActivity: {},
                postalCode: {},
                tels: {},
                faxes: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          job: {inArray: [undefined]},
                          post: {inArray: [undefined]},
                          averageSalary: {inArray: [undefined]},
                          companyName: {inArray: [undefined]},
                          companyActivity: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          job: {inArray: [undefined]},
                          post: {inArray: [undefined]},
                          averageSalary: {inArray: [undefined]},
                          companyName: {inArray: [undefined]},
                          companyActivity: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات شغل معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      job: {inArray: [undefined]},
                      post: {inArray: [undefined]},
                      averageSalary: {inArray: [undefined]},
                      companyName: {inArray: [undefined]},
                      companyActivity: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]},
                      faxes: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه شغل معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            job: {inArray: [undefined]},
                            post: {inArray: [undefined]},
                            averageSalary: {inArray: [undefined]},
                            companyName: {inArray: [undefined]},
                            companyActivity: {inArray: [undefined]},
                            postalCode: {inArray: [undefined]},
                            tels: {inArray: [undefined]},
                            faxes: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان شغل را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      job: {inArray: [undefined]},
                      post: {inArray: [undefined]},
                      averageSalary: {inArray: [undefined]},
                      companyName: {inArray: [undefined]},
                      companyActivity: {inArray: [undefined]},
                      postalCode: {inArray: [undefined]},
                      tels: {inArray: [undefined]},
                      faxes: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه شغل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه شغل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت شغل معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شغل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی شغل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی شغل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      job: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'شغل معتبر نمی‌باشد!'
                        }
                      },
                      post: {
                        persianAlpha: [' ', '‌', ''],
                        errorMessages: {
                          persianAlpha: 'سِمت معتبر نمی‌باشد!'
                        }
                      },
                      averageSalary: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'میانگین حقوق ماهیانه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1000],
                            errorMessages: {
                              integer: 'میانگین حقوق ماهانه معتبر نمی‌باشد!',
                              minimum: 'میانگین حقوق ماهانه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1000'],
                            errorMessages: {
                              integerString: 'میانگین حقوق ماهانه معتبر نمی‌باشد!',
                              minimum: 'میانگین حقوق ماهانه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      companyName: {
                        persianAlphaNumeric: [' ', '‌'],
                        errorMessages: {
                          persianAlphaNumeric: 'نام شرکت معتبر نمی‌باشد!'
                        }
                      },
                      companyActivity: {
                        persianAlphaNumeric: [' ', '‌', ''],
                        errorMessages: {
                          persianAlphaNumeric: 'ماهیت فعالیت شرکت معتبر نمی‌باشد!'
                        }
                      },
                      postalCode: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'کد پستی محل کار معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1000000000, 9999999999],
                            errorMessages: {
                              integer: 'کد پستی محل کار معتبر نمی‌باشد!',
                              minimum: 'کد پستی محل کار معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1000000000', '9999999999'],
                            errorMessages: {
                              integerString: 'کد پستی محل کار معتبر نمی‌باشد!',
                              minimum: 'کد پستی محل کار معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      tels: {
                        type: 'array',
                        items: {
                          type: "object",
                          properties: {
                            id: {},
                            value: {},
                            deleted: {}
                          },
                          switch: [
                            {
                              if: {
                                anyOf: [
                                  {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  {
                                    properties: {
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  }
                                ]
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'تلفن محل کار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {inArray: [undefined]},
                                  value: {inArray: [undefined]},
                                  deleted: {inArray: [true, "true", 1, "1"]}
                                }
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شناسه تلفن محل کار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                not: {
                                  oneOf: [
                                    {
                                      properties: {
                                        value: {
                                          inArray: [undefined]
                                        }
                                      }
                                    },
                                    {
                                      properties: {
                                        deleted: {
                                          inArray: [undefined]
                                        }
                                      }
                                    }
                                  ]
                                }

                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'نمی‌توان تلفن محل کار را همزمان مقداردهی و حذف کرد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  value: {
                                    inArray: [undefined]
                                  }
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  },
                                  deleted: {
                                    inArray: [true, "true", 1, "1"],
                                    errorMessages: {
                                      inArray: 'وضعیت تلفن محل کار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {not: {inArray: [undefined]}}
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی تلفن محل کار معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              continue: true
                            },
                            {
                              if: {
                                properties: {
                                  deleted: {inArray: [undefined]}
                                }
                              },
                              then: {
                                properties: {
                                  value: {
                                    phone: [],
                                    errorMessages: {
                                      phone: 'تلفن محل کار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            }
                          ],
                          additionalProperties: false
                        }
                      },
                      faxes: {
                        type: 'array',
                        items: {
                          type: "object",
                          properties: {
                            id: {},
                            value: {},
                            deleted: {}
                          },
                          switch: [
                            {
                              if: {
                                anyOf: [
                                  {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  {
                                    properties: {
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [undefined]}
                                    }
                                  }
                                ]
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شماره دورنگار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {inArray: [undefined]},
                                  value: {inArray: [undefined]},
                                  deleted: {inArray: [true, "true", 1, "1"]}
                                }
                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                }
                              }
                            },
                            {
                              if: {
                                not: {
                                  oneOf: [
                                    {
                                      properties: {
                                        value: {
                                          inArray: [undefined]
                                        }
                                      }
                                    },
                                    {
                                      properties: {
                                        deleted: {
                                          inArray: [undefined]
                                        }
                                      }
                                    }
                                  ]
                                }

                              },
                              then: {
                                alwaysInvalid: [],
                                errorMessages: {
                                  alwaysInvalid: 'نمی‌توان شماره دورنگار را همزمان مقداردهی و حذف کرد!'
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  value: {
                                    inArray: [undefined]
                                  }
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  },
                                  deleted: {
                                    inArray: [true, "true", 1, "1"],
                                    errorMessages: {
                                      inArray: 'وضعیت شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            },
                            {
                              if: {
                                properties: {
                                  id: {not: {inArray: [undefined]}}
                                }
                              },
                              then: {
                                properties: {
                                  id: {
                                    oneOf: [
                                      {
                                        integer: [0],
                                        errorMessages: {
                                          integer: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      },
                                      {
                                        integerString: ['0'],
                                        errorMessages: {
                                          integerString: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!',
                                          minimum: 'شناسه‌ی شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              continue: true
                            },
                            {
                              if: {
                                properties: {
                                  deleted: {inArray: [undefined]}
                                }
                              },
                              then: {
                                properties: {
                                  value: {
                                    phone: [],
                                    errorMessages: {
                                      phone: 'شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                }
                              }
                            }
                          ],
                          additionalProperties: false
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          assets: {
            oneOf: [
              {
                inArray: [''],
                errorMessages: {
                  inArray: 'میزان دارایی معتبر نمی‌باشد!'
                }
              },
              {
                integer: [0],
                errorMessages: {
                  integer: 'میزان دارایی معتبر نمی‌باشد!',
                  minimum: 'میزان دارایی معتبر نمی‌باشد!'
                }
              },
              {
                integerString: ['0'],
                errorMessages: {
                  integerString: 'میزان دارایی معتبر نمی‌باشد!',
                  minimum: 'میزان دارایی معتبر نمی‌باشد!'
                }
              }
            ]
          },
          accounts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                bankName: {},
                branchName: {},
                branchCode: {},
                accountType: {},
                accountNumber: {},
                shebaNumber: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      bankName: {inArray: [undefined]},
                      branchName: {inArray: [undefined]},
                      branchCode: {inArray: [undefined]},
                      accountType: {inArray: [undefined]},
                      accountNumber: {inArray: [undefined]},
                      shebaNumber: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            bankName: {inArray: [undefined]},
                            branchName: {inArray: [undefined]},
                            branchCode: {inArray: [undefined]},
                            accountType: {inArray: [undefined]},
                            accountNumber: {inArray: [undefined]},
                            shebaNumber: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان حساب بانکی را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      bankName: {inArray: [undefined]},
                      branchName: {inArray: [undefined]},
                      branchCode: {inArray: [undefined]},
                      accountType: {inArray: [undefined]},
                      accountNumber: {inArray: [undefined]},
                      shebaNumber: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه حساب معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه حساب معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی حساب بانکی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      bankName: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام بانک معتبر نمی‌باشد!'
                        }
                      },
                      branchName: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نام شعبه بانک معتبر نمی‌باشد!'
                        }
                      },
                      branchCode: {
                        oneOf: [
                          {
                            inArray: [''],
                            errorMessages: {
                              inArray: 'کد شعبه بانک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integer: [1],
                            errorMessages: {
                              integer: 'کد شعبه بانک معتبر نمی‌باشد!',
                              minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['1'],
                            errorMessages: {
                              integerString: 'کد شعبه بانک معتبر نمی‌باشد!',
                              minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      accountType: {
                        persianAlpha: [' ', '‌'],
                        errorMessages: {
                          persianAlpha: 'نوع حساب بانکی معتبر نمی‌باشد!'
                        }
                      },
                      accountNumber: {
                        match: [/^((\d+(\.\d+)*)|(\d+(-\d+)*)|(\d+(\/\d+)*))$/],
                        errorMessages: {
                          match: 'شماره حساب معتبر نمی‌باشد!'
                        }
                      },
                      shebaNumber: {
                        match: [/^IR\d{24}$/],
                        errorMessages: {
                          match: 'شماره شبای حساب معتبر نمی‌باشد!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          profilePictures: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل شناسنامه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل تصویر پروفایل را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای تصویر پروفایل معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          identityCards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل شناسنامه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل شناسنامه معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل شناسنامه را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل شناسنامه معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای شناسنامه معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای شناسنامه کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای شناسنامه بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          idCards: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل کارت ملی معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل کارت ملی معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل کارت ملی را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: [0],
                            errorMessages: {
                              integerString: 'شناسه فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل کارت ملی معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای کارت ملی معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای کارت ملی کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای کارت ملی بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل کارت ملی معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          },
          accountStatements: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {},
                name: {},
                description: {},
                data: {},
                status: {},
                deleted: {}
              },
              switch: [
                {
                  if: {
                    anyOf: [
                      {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      },
                      {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [undefined]}
                        }
                      }
                    ]
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'اطلاعات فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {inArray: [undefined]},
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]},
                      deleted: {inArray: [true, "true", 1, "1"]}
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                    }
                  }
                },
                {
                  if: {
                    not: {
                      oneOf: [
                        {
                          properties: {
                            name: {inArray: [undefined]},
                            description: {inArray: [undefined]},
                            data: {inArray: [undefined]},
                            status: {inArray: [undefined]}
                          }
                        },
                        {
                          properties: {
                            deleted: {
                              inArray: [undefined]
                            }
                          }
                        }
                      ]
                    }
                  },
                  then: {
                    alwaysInvalid: [],
                    errorMessages: {
                      alwaysInvalid: 'نمی‌توان فایل صورت وضعیت حساب یا دفترچه حساب را همزمان مقداردهی و حذف کرد!'
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      name: {inArray: [undefined]},
                      description: {inArray: [undefined]},
                      data: {inArray: [undefined]},
                      status: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      },
                      deleted: {
                        inArray: [true, "true", 1, "1"],
                        errorMessages: {
                          inArray: 'وضعیت فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                },
                {
                  if: {
                    properties: {
                      id: {not: {inArray: [undefined]}}
                    }
                  },
                  then: {
                    properties: {
                      id: {
                        oneOf: [
                          {
                            integer: [0],
                            errorMessages: {
                              integer: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          },
                          {
                            integerString: ['0'],
                            errorMessages: {
                              integerString: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                              minimum: 'شناسه‌ی فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                            }
                          }
                        ]
                      }
                    }
                  },
                  continue: true
                },
                {
                  if: {
                    properties: {
                      deleted: {inArray: [undefined]}
                    }
                  },
                  then: {
                    properties: {
                      name: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      },
                      description: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'توضیحات فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      },
                      data: {
                        base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                        minSize: 0 * 1024,
                        maxSize: 800 * 1024,
                        errorMessages: {
                          base64: 'فایل بارگذاری شده برای صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!',
                          minSize: 'حجم فایل بارگذاری شده برای صورت وضعیت حساب یا دفترچه حساب کمتر از حد مجاز است!',
                          maxSize: 'حجم فایل بارگذاری شده برای صورت وضعیت حساب یا دفترچه حساب بیشتر از حد مجاز است!'
                        }
                      },
                      status: {
                        persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                          '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                        errorMessages: {
                          persianEnglishAlphaNumeric: 'وضعیت فایل صورت وضعیت حساب یا دفترچه حساب معتبر نمی‌باشد!'
                        }
                      }
                    }
                  }
                }
              ],
              additionalProperties: false
            }
          }
        },
        required: [
          'type',
          'firstName',
          'lastName',
          'gender',
          'fatherName',
          'identityNumber',
          'identitySerialNumber',
          'birthday',
          'email',
          'cellphoneNumbers',
          'identityCards',
          'idCards',
          'addresses'
        ],
        additionalProperties: false
      };
    case 'legal':
      switch (data.legalType) {
        case 'normal':
          return {
            type: 'object',
            properties: {
              type: {
                inArray: ['legal'],
                errorMessages: {
                  inArray: 'نوع پروفایل معتبر نمی‌باشد!'
                }
              },
              legalType: {
                inArray: ['normal'],
                errorMessages: {
                  inArray: 'نوع پروفایل حقوقی معتبر نمی‌باشد!'
                }
              },
              status: {
                persianEnglishAlphaNumeric: [' ', '‌', '', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_',
                  '+', '=', '/', '\\', '،', '؛', '.', ',', '`', '|', ';', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']',
                  '{', '}'],
                errorMessages: {
                  persianEnglishAlphaNumeric: 'وضعیت معتبر نمی‌باشد!'
                }
              },
              companyName: {
                persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
                errorMessages: {
                  persianEnglishAlphaNumeric: 'نام شرکت معتبر نمی‌باشد!'
                }
              },
              activityField: {
                persianAlpha: [' ', '‌', ''],
                errorMessages: {
                  persianAlpha: 'زمینه‌ی فعالیت معتبر نمی‌باشد!'
                }
              },
              registrationNumber: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'شماره ثبت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integer: [1],
                    errorMessages: {
                      integer: 'شماره ثبت معتبر نمی‌باشد!',
                      minimum: 'شماره ثبت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integerString: ['1'],
                    errorMessages: {
                      integerString: 'شماره ثبت معتبر نمی‌باشد!',
                      minimum: 'شماره ثبت معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              registrationPlace: {
                persianAlpha: [' ', '‌', ''],
                errorMessages: {
                  persianAlpha: 'محل ثبت معتبر نمی‌باشد!'
                }
              },
              registrationDate: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'تاریخ ثبت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    jalaliDate: [],
                    errorMessages: {
                      jalaliDate: 'تاریخ ثبت معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              nationalId: {
                integerString: ['10000000000', '19999999999'],
                errorMessages: {
                  integerString: 'شناسه ملی معتبر نمی‌باشد!',
                  minimum: 'شناسه ملی معتبر نمی‌باشد!',
                  maximum: 'شناسه ملی معتبر نمی‌باشد!'
                }
              },
              economicCode: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'کد اقتصادی معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integer: [1],
                    errorMessages: {
                      integer: 'کد اقتصادی معتبر نمی‌باشد!',
                      minimum: 'کد اقتصادی معتبر نمی‌باشد!'
                    }
                  },
                  {
                    integerString: ['1'],
                    errorMessages: {
                      integerString: 'کد اقتصادی معتبر نمی‌باشد!',
                      minimum: 'کد اقتصادی معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              email: {
                email: [],
                errorMessages: {
                  email: 'رایانامه معتبر نمی‌باشد!'
                }
              },
              website: {
                oneOf: [
                  {
                    inArray: [''],
                    errorMessages: {
                      inArray: 'آدرس اینترنتی شرکت معتبر نمی‌باشد!'
                    }
                  },
                  {
                    url: [],
                    errorMessages: {
                      url: 'آدرس اینترنتی شرکت معتبر نمی‌باشد!'
                    }
                  }
                ]
              },
              addresses: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    province: {},
                    city: {},
                    street: {},
                    alley: {},
                    number: {},
                    address: {},
                    postalCode: {},
                    tels: {},
                    faxes: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              province: {inArray: [undefined]},
                              city: {inArray: [undefined]},
                              street: {inArray: [undefined]},
                              alley: {inArray: [undefined]},
                              number: {inArray: [undefined]},
                              address: {inArray: [undefined]},
                              postalCode: {inArray: [undefined]},
                              tels: {inArray: [undefined]},
                              faxes: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              province: {inArray: [undefined]},
                              city: {inArray: [undefined]},
                              street: {inArray: [undefined]},
                              alley: {inArray: [undefined]},
                              number: {inArray: [undefined]},
                              address: {inArray: [undefined]},
                              postalCode: {inArray: [undefined]},
                              tels: {inArray: [undefined]},
                              faxes: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات آدرس معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه آدرس معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                province: {inArray: [undefined]},
                                city: {inArray: [undefined]},
                                street: {inArray: [undefined]},
                                alley: {inArray: [undefined]},
                                number: {inArray: [undefined]},
                                address: {inArray: [undefined]},
                                postalCode: {inArray: [undefined]},
                                tels: {inArray: [undefined]},
                                faxes: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان آدرس را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          province: {inArray: [undefined]},
                          city: {inArray: [undefined]},
                          street: {inArray: [undefined]},
                          alley: {inArray: [undefined]},
                          number: {inArray: [undefined]},
                          address: {inArray: [undefined]},
                          postalCode: {inArray: [undefined]},
                          tels: {inArray: [undefined]},
                          faxes: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه آدرس معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت آدرس معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {not: {inArray: [undefined]}}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه‌ی آدرس معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی آدرس معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          }
                        }
                      },
                      continue: true
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          province: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام استان معتبر نمی‌باشد!'
                            }
                          },
                          city: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام شهر معتبر نمی‌باشد!'
                            }
                          },
                          street: {
                            persianAlpha: [' ', '‌', ''],
                            errorMessages: {
                              persianAlpha: 'نام خیابان معتبر نمی‌باشد!'
                            }
                          },
                          alley: {
                            persianAlphaNumeric: [' ', '‌', ''],
                            errorMessages: {
                              persianAlphaNumeric: 'نام کوچه معتبر نمی‌باشد!'
                            }
                          },
                          number: {
                            oneOf: [
                              {
                                inArray: [''],
                                errorMessages: {
                                  inArray: 'شماره پلاک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integer: [1],
                                errorMessages: {
                                  integer: 'شماره پلاک معتبر نمی‌باشد!',
                                  minimum: 'شماره پلاک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['1'],
                                errorMessages: {
                                  integerString: 'شماره پلاک معتبر نمی‌باشد!',
                                  minimum: 'شماره پلاک معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          address: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '(', ')', '+', '/', '\\', '،', '.', ',',
                              '\'', '"', '«', '»', '<', '>', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'آدرس معتبر نمی‌باشد!'
                            }
                          },
                          postalCode: {
                            oneOf: [
                              {
                                inArray: [''],
                                errorMessages: {
                                  inArray: 'کد پستی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integer: [1000000000, 9999999999],
                                errorMessages: {
                                  integer: 'کد پستی معتبر نمی‌باشد!',
                                  minimum: 'کد پستی معتبر نمی‌باشد!',
                                  maximum: 'کد پستی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['1000000000', '9999999999'],
                                errorMessages: {
                                  integerString: 'کد پستی معتبر نمی‌باشد!',
                                  minimum: 'کد پستی معتبر نمی‌باشد!',
                                  maximum: 'کد پستی معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          tels: {
                            type: 'array',
                            items: {
                              type: "object",
                              properties: {
                                id: {},
                                value: {},
                                deleted: {}
                              },
                              switch: [
                                {
                                  if: {
                                    anyOf: [
                                      {
                                        properties: {
                                          id: {inArray: [undefined]},
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      },
                                      {
                                        properties: {
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      }
                                    ]
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [true, "true", 1, "1"]}
                                    }
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    not: {
                                      oneOf: [
                                        {
                                          properties: {
                                            value: {
                                              inArray: [undefined]
                                            }
                                          }
                                        },
                                        {
                                          properties: {
                                            deleted: {
                                              inArray: [undefined]
                                            }
                                          }
                                        }
                                      ]
                                    }

                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'نمی‌توان شماره تلفن ثابت را همزمان مقداردهی و حذف کرد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      value: {
                                        inArray: [undefined]
                                      }
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      },
                                      deleted: {
                                        inArray: [true, "true", 1, "1"],
                                        errorMessages: {
                                          inArray: 'وضعیت شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {not: {inArray: [undefined]}}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی شماره تلفن ثابت معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  },
                                  continue: true
                                },
                                {
                                  if: {
                                    properties: {
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      value: {
                                        phone: [],
                                        errorMessages: {
                                          phone: 'شماره تلفن ثابت معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                }
                              ],
                              additionalProperties: false
                            }
                          },
                          faxes: {
                            type: 'array',
                            items: {
                              type: "object",
                              properties: {
                                id: {},
                                value: {},
                                deleted: {}
                              },
                              switch: [
                                {
                                  if: {
                                    anyOf: [
                                      {
                                        properties: {
                                          id: {inArray: [undefined]},
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      },
                                      {
                                        properties: {
                                          value: {inArray: [undefined]},
                                          deleted: {inArray: [undefined]}
                                        }
                                      }
                                    ]
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {inArray: [undefined]},
                                      value: {inArray: [undefined]},
                                      deleted: {inArray: [true, "true", 1, "1"]}
                                    }
                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    not: {
                                      oneOf: [
                                        {
                                          properties: {
                                            value: {
                                              inArray: [undefined]
                                            }
                                          }
                                        },
                                        {
                                          properties: {
                                            deleted: {
                                              inArray: [undefined]
                                            }
                                          }
                                        }
                                      ]
                                    }

                                  },
                                  then: {
                                    alwaysInvalid: [],
                                    errorMessages: {
                                      alwaysInvalid: 'نمی‌توان شماره دورنگار را همزمان مقداردهی و حذف کرد!'
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      value: {
                                        inArray: [undefined]
                                      }
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه شماره دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه شماره دورنگار معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      },
                                      deleted: {
                                        inArray: [true, "true", 1, "1"],
                                        errorMessages: {
                                          inArray: 'وضعیت شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                },
                                {
                                  if: {
                                    properties: {
                                      id: {not: {inArray: [undefined]}}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      id: {
                                        oneOf: [
                                          {
                                            integer: [0],
                                            errorMessages: {
                                              integer: 'شناسه‌ی دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی دورنگار معتبر نمی‌باشد!'
                                            }
                                          },
                                          {
                                            integerString: ['0'],
                                            errorMessages: {
                                              integerString: 'شناسه‌ی دورنگار معتبر نمی‌باشد!',
                                              minimum: 'شناسه‌ی دورنگار معتبر نمی‌باشد!'
                                            }
                                          }
                                        ]
                                      }
                                    }
                                  },
                                  continue: true
                                },
                                {
                                  if: {
                                    properties: {
                                      deleted: {inArray: [undefined]}
                                    }
                                  },
                                  then: {
                                    properties: {
                                      value: {
                                        phone: [],
                                        errorMessages: {
                                          phone: 'شماره دورنگار معتبر نمی‌باشد!'
                                        }
                                      }
                                    }
                                  }
                                }
                              ],
                              additionalProperties: false
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              tradingCode: {
                persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\',
                  '،', '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                errorMessages: {
                  persianEnglishAlphaNumeric: 'کد بورسی معتبر نمی‌باشد!'
                }
              },
              accounts: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    bankName: {},
                    branchName: {},
                    branchCode: {},
                    accountType: {},
                    accountNumber: {},
                    shebaNumber: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              bankName: {inArray: [undefined]},
                              branchName: {inArray: [undefined]},
                              branchCode: {inArray: [undefined]},
                              accountType: {inArray: [undefined]},
                              accountNumber: {inArray: [undefined]},
                              shebaNumber: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              bankName: {inArray: [undefined]},
                              branchName: {inArray: [undefined]},
                              branchCode: {inArray: [undefined]},
                              accountType: {inArray: [undefined]},
                              accountNumber: {inArray: [undefined]},
                              shebaNumber: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات حساب معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه حساب معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                bankName: {inArray: [undefined]},
                                branchName: {inArray: [undefined]},
                                branchCode: {inArray: [undefined]},
                                accountType: {inArray: [undefined]},
                                accountNumber: {inArray: [undefined]},
                                shebaNumber: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [true, "true", 1, "1"]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان حساب بانکی را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          bankName: {inArray: [undefined]},
                          branchName: {inArray: [undefined]},
                          branchCode: {inArray: [undefined]},
                          accountType: {inArray: [undefined]},
                          accountNumber: {inArray: [undefined]},
                          shebaNumber: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه حساب معتبر نمی‌باشد!',
                                  minimum: 'شناسه حساب معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه حساب معتبر نمی‌باشد!',
                                  minimum: 'شناسه حساب معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت حساب معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        properties: {
                          bankName: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام بانک معتبر نمی‌باشد!'
                            }
                          },
                          branchName: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نام شعبه بانک معتبر نمی‌باشد!'
                            }
                          },
                          branchCode: {
                            oneOf: [
                              {
                                inArray: [''],
                                errorMessages: {
                                  inArray: 'کد شعبه بانک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integer: [1],
                                errorMessages: {
                                  integer: 'کد شعبه بانک معتبر نمی‌باشد!',
                                  minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['1'],
                                errorMessages: {
                                  integerString: 'کد شعبه بانک معتبر نمی‌باشد!',
                                  minimum: 'کد شعبه بانک معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          accountType: {
                            persianAlpha: [' ', '‌'],
                            errorMessages: {
                              persianAlpha: 'نوع حساب بانکی معتبر نمی‌باشد!'
                            }
                          },
                          accountNumber: {
                            match: [/^((\d+(\.\d+)*)|(\d+(-\d+)*)|(\d+(\/\d+)*))$/],
                            errorMessages: {
                              match: 'شماره حساب معتبر نمی‌باشد!'
                            }
                          },
                          shebaNumber: {
                            match: [/^IR\d{24}$/],
                            errorMessages: {
                              match: 'شماره شبای حساب معتبر نمی‌باشد!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '-', '_', '‌'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت حساب معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              tradingViaInternet: {
                inArray: [0, '0', 1, '1'],
                errorMessages: {
                  inArray: 'وضعیت درخواست خرید و فروش از طریق اینترنت معتبر نمی‌باشد!'
                }
              },
              profilePictures: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل شناسنامه معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل تصویر پروفایل را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {not: {inArray: [undefined]}}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!',
                                  minimum: 'شناسه‌ی فایل تصویر پروفایل معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          }
                        }
                      },
                      continue: true
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای تصویر پروفایل معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای تصویر پروفایل بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل تصویر پروفایل معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              establishmentAnnouncements: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل آگهی تاسیس شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای آگهی تاسیس شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای آگهی تاسیس شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای آگهی تاسیس شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل آگهی تاسیس شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              officialGazettes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل روزنامه رسمی شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای روزنامه رسمی شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای روزنامه رسمی شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای روزنامه رسمی شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل روزنامه رسمی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              latestChanges: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل آخرین تغییرات شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای آخرین تغییرات شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای آخرین تغییرات شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای آخرین تغییرات شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل آخرین تغییرات شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              inquiryAnnouncements: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل آگهی استعلام سامانه شماره شناسه ملی را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای آگهی استعلام سامانه شماره شناسه ملی کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای آگهی استعلام سامانه شماره شناسه ملی بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل آگهی استعلام سامانه شناسه ملی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              assessments: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل اساسنامه شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل اساسنامه شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل اساسنامه شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای اساسنامه شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای اساسنامه شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای اساسنامه شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل اساسنامه شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              idCards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل کارت ملی مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              identityCards: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل شناسنامه مدیر عامل و اعضای هیئت مدیره شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              economicCodes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل کد اقتصادی شرکت را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای کد اقتصادی شرکت معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای کد اقتصادی شرکت کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای کد اقتصادی شرکت بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل کد اقتصادی شرکت معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              gettingTradingCodeRequests: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای نامه از شرکت در سربرگ جهت اخذ کد بورسی کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای نامه از شرکت در سربرگ جهت اخذ کد بورسی بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل نامه از شرکت در سربرگ جهت اخذ کد بورسی معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              },
              introductionLetterForEnvoys: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: {},
                    name: {},
                    description: {},
                    data: {},
                    status: {},
                    deleted: {}
                  },
                  switch: [
                    {
                      if: {
                        anyOf: [
                          {
                            properties: {
                              id: {inArray: [undefined]},
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          },
                          {
                            properties: {
                              name: {inArray: [undefined]},
                              description: {inArray: [undefined]},
                              data: {inArray: [undefined]},
                              status: {inArray: [undefined]},
                              deleted: {inArray: [undefined]}
                            }
                          }
                        ]
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'اطلاعات فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          id: {inArray: [undefined]},
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]},
                          deleted: {inArray: [true, "true", 1, "1"]}
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                        }
                      }
                    },
                    {
                      if: {
                        not: {
                          oneOf: [
                            {
                              properties: {
                                name: {inArray: [undefined]},
                                description: {inArray: [undefined]},
                                data: {inArray: [undefined]},
                                status: {inArray: [undefined]}
                              }
                            },
                            {
                              properties: {
                                deleted: {
                                  inArray: [undefined]
                                }
                              }
                            }
                          ]
                        }
                      },
                      then: {
                        alwaysInvalid: [],
                        errorMessages: {
                          alwaysInvalid: 'نمی‌توان فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری را همزمان مقداردهی و حذف کرد!'
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          name: {inArray: [undefined]},
                          description: {inArray: [undefined]},
                          data: {inArray: [undefined]},
                          status: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          id: {
                            oneOf: [
                              {
                                integer: [0],
                                errorMessages: {
                                  integer: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                                }
                              },
                              {
                                integerString: ['0'],
                                errorMessages: {
                                  integerString: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!',
                                  minimum: 'شناسه فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                                }
                              }
                            ]
                          },
                          deleted: {
                            inArray: [true, "true", 1, "1"],
                            errorMessages: {
                              inArray: 'وضعیت فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    },
                    {
                      if: {
                        properties: {
                          deleted: {inArray: [undefined]}
                        }
                      },
                      then: {
                        properties: {
                          name: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'نام انتخاب شده برای فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          },
                          description: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'توضیحات فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          },
                          data: {
                            base64: ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp'],
                            minSize: 0 * 1024,
                            maxSize: 800 * 1024,
                            errorMessages: {
                              base64: 'فایل بارگذاری شده برای معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!',
                              minSize: 'حجم فایل بارگذاری شده برای معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری کمتر از حد مجاز است!',
                              maxSize: 'حجم فایل بارگذاری شده برای معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری بیشتر از حد مجاز است!'
                            }
                          },
                          status: {
                            persianEnglishAlphaNumeric: [' ', '‌', '', '-', '_', '!', '@', '#', '$', '%', '&', '(', ')', '+', '/', '\\', '،',
                              '.', ',', '\'', '"', '«', '»', '<', '>', '?', '؟', '[', ']', '{', '}'],
                            errorMessages: {
                              persianEnglishAlphaNumeric: 'وضعیت فایل معرفی نامه نماینده شرکت در سربرگ جهت انجام کار در کارگزاری معتبر نمی‌باشد!'
                            }
                          }
                        }
                      }
                    }
                  ],
                  additionalProperties: false
                }
              }
            },
            required: [
              'type',
              'legalType',
              'email',
              'addresses',
              'activityField',
              'registrationNumber',
              'registrationDate',
              'establishmentAnnouncements',
              'latestChanges',
              'companyName'
            ],
            additionalProperties: false
          };
        case 'bourse':
        case 'governmental':
        case 'unofficial':
        default:
          return {
            alwaysInvalid: [],
            errorMessages: {
              alwaysInvalid: 'نوع پروفایل حقوقی معتبر نمی باشد!'
            }
          };
      }
      break;
    default:
      return {
        alwaysInvalid: [],
        errorMessages: {
          alwaysInvalid: 'نوع پروفایل معتبر نمی باشد!'
        }
      };
  }
};
