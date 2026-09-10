import PageHeader from "@/components/PageHeader";
import MembershipRegistration from "@/components/MembershipRegistration";
import JoinSteps from "@/components/JoinSteps";

export const metadata = {
  title: "Join the Forward Movement of Nigeria — Digital Membership",
  description:
    "Register as a member of the Forward Movement of Nigeria and receive your official digital party membership ID card — free for every Nigerian citizen.",
};

export default function RegisterPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free Digital Membership • Instant ID Card"
        title="Register with the"
        highlight="Movement"
        description="Join over 5 million registered Nigerian citizens in under two minutes. Receive your official FMN digital membership ID card instantly."
      />
      <MembershipRegistration />
      <JoinSteps />
    </>
  );
}