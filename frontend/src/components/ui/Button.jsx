import { Link } from "react-router-dom";

// DavidFLIX port of the IWD LABS <Button> (IWD LABS Design System/components/core/Button.jsx).
// Same API — variant, size, icon, fullWidth — styled by the .btn-* classes in index.css.
// Adds `to` (in-app route) and `href` (external link) so a link can look like a button.
//
//   <Button icon={<Icon name='play_arrow' />}>Play trailer</Button>
//   <Button variant='ghost' size='sm' to='/login'>Sign in</Button>
//   <Button href='https://example.com' trailingIcon={<Icon name='arrow_outward' />}>Visit</Button>
//
// variant: primary (azure) · ghost (hairline) · quiet (azure wash) · danger (red, destructive only)
// size: sm (dense, 36px) · md (default, 44px hit target) · lg (hero CTAs, 52px)
const VARIANTS = { primary: "btn-primary", ghost: "btn-ghost", quiet: "btn-quiet", danger: "btn-danger" };
const SIZES = { sm: "btn-sm", md: "", lg: "btn-lg" };

const Button = ({
	variant = "primary",
	size = "md",
	fullWidth = false,
	icon = null,
	trailingIcon = null,
	to,
	href,
	className = "",
	children,
	...rest
}) => {
	const classes = [VARIANTS[variant] || VARIANTS.primary, SIZES[size], fullWidth ? "w-full" : "", className]
		.filter(Boolean)
		.join(" ");
	const content = (
		<>
			{icon}
			{children}
			{trailingIcon}
		</>
	);

	if (to) {
		return (
			<Link to={to} className={classes} {...rest}>
				{content}
			</Link>
		);
	}
	if (href) {
		return (
			<a href={href} target='_blank' rel='noreferrer' className={classes} {...rest}>
				{content}
			</a>
		);
	}
	return (
		<button type='button' className={classes} {...rest}>
			{content}
		</button>
	);
};
export default Button;
