import axios from "axios";
import { useEffect, useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import MembersDataTable from "../../components/admin/MembersDataTable";
import SuccessfullyDeletedMemberAlert from "../../components/admin/alerts/SuccessfullyDeletedMemberAlert";
import SuccessfullyEditedMemberAlert from "../../components/admin/alerts/SuccessfullyEditedMemberAlert";
import { IMember } from "../../interfaces";

const Members = () => {
  const [members, setMembers] = useState<IMember[]>([]);
  const [
    successfullyDeletedMemberAlertOpen,
    setSuccessfullyDeletedMemberAlertOpen,
  ] = useState(false);
  const [
    successfullyEditedMemberAlertOpen,
    setSuccessfullyEditedMemberAlertOpen,
  ] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    const getMembers = async () => {
      const headers = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      try {
        const response = await axios.get(
          "https://backend-url/api/admin/members",
          headers
        );
        setMembers(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.message);
        }
      }
    };

    getMembers();
  }, []);

  return (
    <div className="m-5">
      <MembersDataTable
        members={members}
        setMembers={setMembers}
        setSuccessfullyDeletedMemberAlertOpen={
          setSuccessfullyDeletedMemberAlertOpen
        }
        setSuccessfullyEditedMemberAlertOpen={
          setSuccessfullyEditedMemberAlertOpen
        }
      />

      <SuccessfullyDeletedMemberAlert
        successfullyDeletedMemberAlertOpen={successfullyDeletedMemberAlertOpen}
        setSuccessfullyDeletedMemberAlertOpen={
          setSuccessfullyDeletedMemberAlertOpen
        }
      />

      <SuccessfullyEditedMemberAlert
        successfullyEditedMemberAlertOpen={successfullyEditedMemberAlertOpen}
        setSuccessfullyEditedMemberAlertOpen={
          setSuccessfullyEditedMemberAlertOpen
        }
      />
    </div>
  );
};

export default Members;
