import Image from "next/image"
import { contactDetails } from "@/data/contact-us.data"
import { SearchIcon } from "@/components/icons"
import InputComponent from "@/components/common/input.component"
import FooterComponent from "@/components/common/footer.component"
import { ContactType } from "@/types"
import client from "@/sanity/client"
import { contactDataQuery } from "@/sanity/query"
import { PortableTextReactComponents, PortableText } from "next-sanity"

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-theme-black lg:text-left text-center text-[64px] lg:text-[55px] xl:text-[96px] leading-[0.9em] font-theme-font-medium">
        {children}
      </h1>
    ),
    normal: ({ children }) => (
      <p className="font-theme-font-light text-base">{children}</p>
    ),
  },
  marks: {
    color: ({ children, value }) => (
      <span
        className="lg:text-left text-center text-[64px] lg:text-[55px] xl:text-[96px] leading-[0.9em] font-theme-font-medium"
        style={{ color: value?.hex }}
      >
        {children}
      </span>
    ),
  },
}

export const revalidate = 0
const ContactUs = async () => {
  const contactData: ContactType = await client.fetch(contactDataQuery)
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <div className={"w-full max-w-[90rem] px-6 md:px-12 py-14"}>
          <div
            className={
              "bg-theme-gray lg:min-h-[900px] lg:py-8 relative items-center justify-end flex flex-col lg:flex-row rounded-3xl overflow-hidden lg:rounded-[50px]"
            }
          >
            <div
              className={
                "flex flex-col py-12 lg:py-0 lg:px-12 justify-center items-center gap-16 lg:gap-0 relative z-10 lg:flex-row text-theme-black"
              }
            >
              <div
                className={
                  "flex flex-col w-5/6 md:w-2/3 lg:w-[48%] lg:mr-[5%] gap-4 text-theme-black"
                }
              >
                <h1
                  className={
                    "text-[48px] md:text-[64px] font-theme-font-medium"
                  }
                >
                  Get in Touch
                </h1>
                <PortableText
                  value={contactData?.text}
                  components={components}
                />
                {/* <p className={"font-theme-font-light text-base"}>
                  The AMG customer service team is available{" "}
                  <span className={"font-theme-font-medium"}>
                    Monday through Friday from 9 a.m. - 5 p.m. EST.
                  </span>
                </p>
                <p className={"font-theme-font-light text-base"}>
                  You can reach us at (866) 264-0001 or feel free to complete
                  the form below.{" "}
                </p>
                <p className={"font-theme-font-light text-base"}>
                  We take great pride in responding to emails and phone calls as
                  soon as possible. Thank you and we look forward to connecting
                  with you soon!
                </p> */}
                <form className={"mt-6 flex flex-col gap-5"}>
                  <InputComponent
                    placeholder={contactData?.inputPlaceHolderOne}
                  />
                  <InputComponent
                    placeholder={contactData?.inputPlaceHolderTwo}
                  />
                  <InputComponent
                    placeholder={contactData?.inputPlaceHolderThree}
                  />
                  <button
                    type={"submit"}
                    className={
                      "w-full lg:w-1/2 rounded-full border border-theme-black text-theme-black bg-transparent px-6 py-3"
                    }
                  >
                    <p className={"font-theme-font-roman"}>Send a Message</p>
                  </button>
                  <div
                    className={"flex mt-6 flex-col md:flex-row gap-4 w-full"}
                  >
                    {contactDetails.map((details, key) => (
                      <div
                        key={details.heading}
                        className={`flex gap-4 ${
                          key === 0 ? "w-[65%]" : "w-full"
                        }`}
                      >
                        <div className={"w-[28px] h-[28px]"}>
                          {details.icon()}
                        </div>
                        <div>
                          <p
                            className={
                              "uppercase font-theme-font-medium text-sm"
                            }
                          >
                            {details.heading}
                          </p>
                          <p
                            className={
                              "font-theme-font-light text-sm break-all"
                            }
                          >
                            {details?.heading === "Phone" && contactData?.phone}
                            {details?.heading === "Email" && contactData?.email}
                            {details?.heading === "Address" &&
                              contactData?.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </div>
              <div
                className={
                  "w-[80%] lg:w-[45%] h-[650px] sm:h-[450px] lg:h-[650px] rounded-3xl overflow-hidden xl:w-[33%]"
                }
              >
                <iframe
                  src={contactData?.iframeUrl}
                  style={{ border: 0 }}
                  className={"w-full h-full"}
                  aria-hidden="false"
                />
              </div>
            </div>
            <Image
              src={"/images/contact-form.png"}
              alt={"contact-form"}
              width={419}
              height={900}
              className={
                "transform rotate-90 lg:rotate-0 absolute -bottom-[20%] lg:!h-full lg:top-0 lg:bottom-0 z-0"
              }
            />
          </div>
        </div>
        {/* <div
          className={"w-full flex items-center justify-center bg-theme-gray"}
        >
          <div
            className={
              "max-w-[90rem] w-full px-8 md:px-12 md:pr-16 py-12 md:py-24"
            }
          >
            <h1
              className={
                "text-[36px] md:text-[48px] font-theme-font-medium mb-2"
              }
            >
              In Store Submissions
            </h1>
            <p className={"text-[20px] md:text-[24px] font-theme-font-light"}>
              {contactData?.description}
            </p>
            <div
              className={
                "border border-white bg-white rounded-full w-full mt-10 lg:w-1/2 pl-5 flex justify-between"
              }
              style={{ boxShadow: "0px 0px 19.2px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <input
                className={
                  "bg-transparent py-5 placeholder:text-[#100F0F]  text-[18px]"
                }
                placeholder={contactData?.inputPlaceHolderFour}
              />
              <button className={"text-[14px] px-3"}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </div> */}
      </div>

      <FooterComponent />
    </>
  )
}

export default ContactUs
