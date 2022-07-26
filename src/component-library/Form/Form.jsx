/**
 *
 * @param {Object} props
 * @param {String} props.id
 * @param {String} props.method
 * @param {String} props.handleSubmit
 * @param {String} props.children
 * @param {String} props.formStyleModifier
 *
 * @returns {JSX.Element}
 */
function Form({
  id,
  method,
  handleSubmit,
  children,
  formStyleModifier,
}) {
  return (
    <form
      id={id}
      method={method}
      onSubmit={handleSubmit}
      className={`${
        formStyleModifier ? ` ${formStyleModifier}` : ""
      }`}
    >
      {children}
    </form>
  )
}

export default Form
