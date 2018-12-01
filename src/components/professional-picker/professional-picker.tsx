import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';
import { imageHandler } from '../../utils/image-handler';
import { Professional } from '../../models/professional.model';

@Component({
    tag: 'professional-picker',
    styleUrl: 'professional-picker.css',
    shadow: false
})
export class ProfessionalPicker {

    @Prop({ mutable: true }) professionals: Professional[] = [];

    @State() selectedProfessionalId: string = null;

    @Event() onProfessionalUpdated: EventEmitter;

    componentWillLoad(): void {
        this.selectedProfessionalId = this.professionals[1].id;
    }

    private setSelectedProfessional(professional: Professional): void {
        this.selectedProfessionalId = professional.id;

        this.onProfessionalUpdated.emit(professional);
    }

    private isSelectedProfessional(professionalId: string): boolean {
        if (!this.selectedProfessionalId) { return false; }

        return professionalId === this.selectedProfessionalId;
    }

    render(): JSX.Element {
        return (
            <div class="picker-container">
                {this.professionals.map((professional) => {
                    const imgSrc = imageHandler(professional.picture) || 'assets/user.svg';

                    return (
                        <figure
                            class="professional"
                            onClick={() => this.setSelectedProfessional(professional)}>
                            <img
                                class={{
                                    'selected': this.isSelectedProfessional(professional.id)
                                }}
                                src={imgSrc} />
                            <figcaption>{professional.name}</figcaption>
                        </figure>
                    )
                })}
            </div>
        );
    }
}
