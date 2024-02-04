const ProfileSettingsSection = (props) => {
  const { user } = props

  return (
    <section className="border p-2 my-4">
      <h2 className="text-xl">Username: {user?.username}</h2>
      <h2 className="text-xl">Email: {user?.email}</h2>
    </section>
  )
}

export default ProfileSettingsSection
